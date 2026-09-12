import React from "react";
import Image from "next/image";

export interface IPost {
    id: number;
    location?: string; 
    date?: string;
    images: {
        src: string; 
    }[]; 
    description?: string; 
}

interface IGalleryPostProps {
    post: IPost; 
    onClick: () => void;
}

const GalleryPost : React.FC<IGalleryPostProps> = ({ post, onClick }) => {
    return (
        <article
            onClick={onClick}
            className="border-solid border-[rgba(255,255,255,0.15)] border-[1px] w-[400px] rounded-3xl flex flex-col">
            <header className="w-full border-solid border-[rgba(255,255,255,0.15)] border-b-[1px] h-[75px] px-4 py-2 rounded-t-xl">
                <div className="flex gap-4">
                    <div className="bg-white w-[50px] h-[50px] relative rounded-full">
                        <Image
                            src="/logo.png"
                            alt="placeholder"
                            className="rounded-full object-contain"
                            fill
                            sizes="50px"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 
                            className="text-xl font-medium text-white">
                                sbhs_cs_academy
                        </h1>
                        <h2
                            className="text-lg text-white text-nowrap">
                                { post.location }
                        </h2>
                    </div>
                </div>
                <p className="text-[rgba(255,255,255,0.75)] absolute right-8 top-3">
                    { post.date }
                </p>
            </header>
            <div className="relative w-[400px] h-[400px]">
               {
                post.images.length > 0 && (
                    <Image
                        src={post.images[0].src}
                        alt="placeholder"
                        className="object-cover"
                        fill
                        sizes="400px"
                    />
                )
               }
            </div>
            <footer className="h-[100px] p-4">
                <p className="text-white h-[75px] overflow-scroll">
                    { post.description }
                </p>
            </footer>
        </article>
    )
}

export default GalleryPost;