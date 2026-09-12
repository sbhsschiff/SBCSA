// Builds the gallery: reads the per-year photo folders off disk, writes optimized
// WebP renditions into public/gallery/<year>/, and emits the manifest the site reads.
//
// Run with: npm run gallery:build
//
// Source photos stay on disk as the archive; only the resized renditions land in the repo.

import sharp from "sharp";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Re-point this when new photos arrive. Each year lives in "<year> pictures".
const SOURCE_ROOT = "C:/Users/steve/OneDrive/Desktop/website";
const YEARS = [2024, 2025, 2026, 2027];

const OUT_DIR = path.join(ROOT, "public/gallery");
const MANIFEST = path.join(ROOT, "common/data/gallery-photos.json");

const THUMB_WIDTH = 600;
const FULL_WIDTH = 2000;
const THUMB_QUALITY = 78;
const FULL_QUALITY = 82;

const IMAGE_RE = /\.(jpe?g|png|heic)$/i;
const HEIC_RE = /\.heic$/i;
const HEIC_SCRIPT = path.join(__dirname, "heic-to-png.ps1");

// EXIF DateTimeOriginal, scanned straight out of the raw EXIF block. Avoids pulling
// in an EXIF parser for the one tag we care about.
const EXIF_DATE_RE = /(\d{4}):(\d{2}):(\d{2}) \d{2}:\d{2}:\d{2}/;

// Dates baked into filenames: PXL_20251216_..., "Screenshot 2025-11-21 at ...".
const NAME_DATE_RE = /(20\d{2})[-:_ ]?(\d{2})[-:_ ]?(\d{2})/;

const readExifDate = (exif) => {
    if (!exif) return null;
    const match = exif.toString("latin1").match(EXIF_DATE_RE);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
};

const readNameDate = (file) => {
    const match = file.match(NAME_DATE_RE);
    if (!match) return null;

    const [, year, month, day] = match;
    if (+month < 1 || +month > 12 || +day < 1 || +day > 31) return null;

    return `${year}-${month}-${day}`;
};

// Natural sort so image2 lands before image10.
const naturalCompare = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
}).compare;

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

// sharp's prebuilt libheif reads HEIC container metadata but cannot decode the
// pixels (it ships without an HEVC decoder). Windows' own HEIF codec can, so HEIC
// files get decoded to a temporary PNG first and sharp takes it from there.
const toDecodableFile = async (filePath, tempDir) => {
    if (!HEIC_RE.test(filePath)) return { source: filePath, temp: null };

    const temp = path.join(tempDir, `${path.basename(filePath, path.extname(filePath))}.png`);

    await execFileAsync("powershell.exe", [
        "-NoProfile",
        "-ExecutionPolicy", "Bypass",
        "-File", HEIC_SCRIPT,
        "-Source", filePath,
        "-Destination", temp,
    ]);

    return { source: temp, temp };
};

const buildYear = async (year, tempDir) => {
    const sourceDir = path.join(SOURCE_ROOT, `${year} pictures`);
    const entries = (await fs.readdir(sourceDir)).filter((f) => IMAGE_RE.test(f));

    const failures = [];
    const photos = [];
    let sourceBytes = 0;

    for (const file of entries) {
        const filePath = path.join(sourceDir, file);

        try {
            // Reading metadata works even for HEIC, so this stays on the original.
            const metadata = await sharp(filePath).metadata();
            const { size } = await fs.stat(filePath);
            sourceBytes += size;

            photos.push({
                file,
                filePath,
                date: readExifDate(metadata.exif) ?? readNameDate(file),
            });
        } catch (error) {
            failures.push(`${file}: ${error.message.split("\n")[0]}`);
        }
    }

    // Chronological, with undated photos falling to the end in natural filename order.
    photos.sort((a, b) => {
        if (a.date && b.date && a.date !== b.date) return a.date < b.date ? -1 : 1;
        if (a.date && !b.date) return -1;
        if (!a.date && b.date) return 1;
        return naturalCompare(a.file, b.file);
    });

    const yearDir = path.join(OUT_DIR, String(year));
    const thumbDir = path.join(yearDir, "thumbs");
    const fullDir = path.join(yearDir, "full");

    await fs.rm(yearDir, { recursive: true, force: true });
    await fs.mkdir(thumbDir, { recursive: true });
    await fs.mkdir(fullDir, { recursive: true });

    const manifest = [];
    let outputBytes = 0;

    for (const photo of photos) {
        // Numbered off the manifest, not the loop index, so a failed photo leaves
        // no gap in the sequence.
        const name = `${year}_${manifest.length + 1}`;
        let temp = null;

        try {
            ({ source: photo.source, temp } = await toDecodableFile(photo.filePath, tempDir));

            // .rotate() with no argument bakes in EXIF orientation. Required: sharp
            // drops metadata on write, so an unrotated portrait would render sideways.
            const image = sharp(photo.source).rotate();

            const [thumb, full] = await Promise.all([
                image
                    .clone()
                    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
                    .webp({ quality: THUMB_QUALITY })
                    .toFile(path.join(thumbDir, `${name}.webp`)),
                image
                    .clone()
                    .resize({ width: FULL_WIDTH, withoutEnlargement: true })
                    .webp({ quality: FULL_QUALITY })
                    .toFile(path.join(fullDir, `${name}.webp`)),
            ]);

            outputBytes += thumb.size + full.size;

            manifest.push({
                name,
                w: full.width,
                h: full.height,
                date: photo.date,
            });
        } catch (error) {
            failures.push(`${photo.file}: ${error.message.split("\n")[0]}`);
        } finally {
            if (temp) await fs.rm(temp, { force: true });
        }
    }

    const dated = photos.filter((p) => p.date).length;
    console.log(
        `${year}: ${manifest.length} photos  ${formatBytes(sourceBytes)} -> ${formatBytes(outputBytes)}  (${dated} dated)`
    );
    failures.forEach((f) => console.warn(`  ! skipped ${f}`));

    return manifest;
};

const main = async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "gallery-"));
    const manifest = {};

    try {
        for (const year of YEARS) {
            manifest[year] = await buildYear(year, tempDir);
        }
    } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
    }

    await fs.writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

    const total = Object.values(manifest).reduce((sum, p) => sum + p.length, 0);
    console.log(`\nWrote ${total} photos to public/gallery and ${path.relative(ROOT, MANIFEST)}`);
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
