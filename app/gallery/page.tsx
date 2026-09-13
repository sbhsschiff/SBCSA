import GalleryStrip from "@/components/Gallery/GalleryStrip";
import Folder from "@/components/Gallery/Folder";
import PageTitle from "@/components/PageTitle";
import { getPhotos } from "@/components/Gallery/photos";

import { classes } from "@/common/data/gallery.json";

const Gallery = () => {
    const currentClasses = classes.filter((c) => getPhotos(c.year).length > 0);
    const futureClasses = classes.filter((c) => getPhotos(c.year).length === 0);

    return (
        <div className="w-full relative pb-10">
            <GalleryStrip className="mt-4 absolute top-12" />
            <div className="mt-36 px-12">
                <PageTitle>Gallery</PageTitle>
            </div>
            <div className="mt-10 px-12 flex gap-8 flex-wrap">
                {
                    currentClasses.map((c) => (
                        <Folder 
                            key={c.year}
                            year={c.year}
                            hasPhotos={true}
                        />
                    ))
                }
            </div>
            <div className="mt-12 px-12 flex gap-8 flex-wrap">
                {
                    futureClasses.map((c) => (
                        <Folder 
                            key={c.year}
                            year={c.year}
                            hasPhotos={false}
                        />
                    ))
                }
            </div>
        </div>
    )

}

export default Gallery;
