import GalleryStrip from "@/components/Gallery/GalleryStrip";
import { classes } from "@/common/data/gallery.json";
import GalleryContainer from "@/components/Gallery/container";
import fs from "fs/promises";
import path from "path";
import { IPost } from "@/components/Gallery/Post";

interface IClass {
    year: number;
    posts: IPost[];
}

const YearGallery = async ({ params } : { params: Promise<{ year: string }> }) => {
    const { year } = await params;
    const data = classes as IClass[];
    const currentClass = data.find((c) => c.year.toString() === year);

    // Read each post's images off disk. Builds a new array rather than mutating
    // the imported JSON, which is module-level and shared across requests.
    const posts = await Promise.all(
        (currentClass?.posts ?? []).map(async (post) => {
            const postDir = path.join(process.cwd(), `public/gallery/${year}/${post.id}`);
            const entries = await fs.readdir(postDir).catch(() => [] as string[]);

            return {
                ...post,
                images: entries
                    .filter((img) => img.endsWith(".jpg"))
                    .map((img) => ({ src: `/gallery/${year}/${post.id}/${img}` })),
            };
        })
    );

    return (
        <div className="h-screen w-screen relative">
            <GalleryStrip className="mt-4 absolute top-12" />
            <GalleryContainer 
                slides={posts}
            />
        </div>
    )
}

export async function generateStaticParams() {
    return classes
        .filter((c) => c.posts.length > 0)
        .map(({ year }) => ({ year: year.toString() }));
}

export default YearGallery;
