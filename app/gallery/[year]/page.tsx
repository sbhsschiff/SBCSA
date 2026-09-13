import Link from "next/link";
import { notFound } from "next/navigation";
import GalleryStrip from "@/components/Gallery/GalleryStrip";
import MasonryGrid from "@/components/Gallery/MasonryGrid";
import PageTitle from "@/components/PageTitle";
import { getPhotos, getYears } from "@/components/Gallery/photos";

const YearGallery = async ({ params }: { params: Promise<{ year: string }> }) => {
    const { year } = await params;
    const photos = getPhotos(year);

    if (photos.length === 0) notFound();

    return (
        <div className="w-full relative pb-16">
            <GalleryStrip className="mt-4 absolute top-12" />
            <div className="mt-36 px-6 md:px-12">
                <header className="mb-8">
                    <Link
                        href="/gallery"
                        className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors text-sm uppercase tracking-wide"
                    >
                        &larr; All years
                    </Link>
                    <p className="text-white text-lg font-light uppercase mt-4">Class of</p>
                    <PageTitle>{year}</PageTitle>
                    <p className="text-[rgba(255,255,255,0.6)] mt-2">
                        {photos.length} photos
                    </p>
                </header>
                <MasonryGrid year={year} photos={photos} />
            </div>
        </div>
    );
};

export async function generateStaticParams() {
    return getYears().map((year) => ({ year }));
}

export default YearGallery;
