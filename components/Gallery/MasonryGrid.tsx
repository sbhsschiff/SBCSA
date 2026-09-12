"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import { IPhoto, thumbSrc } from "./photos";

// Matches the Tailwind breakpoints used for the grid below.
const BREAKPOINTS = [
    { query: "(min-width: 1280px)", columns: 4 },
    { query: "(min-width: 1024px)", columns: 3 },
    { query: "(min-width: 640px)", columns: 2 },
];

const DEFAULT_COLUMNS = 3;

const useColumnCount = () => {
    const [columns, setColumns] = useState(DEFAULT_COLUMNS);

    useEffect(() => {
        const lists = BREAKPOINTS.map((b) => window.matchMedia(b.query));

        const update = () => {
            const match = BREAKPOINTS.findIndex((_, i) => lists[i].matches);
            setColumns(match === -1 ? 1 : BREAKPOINTS[match].columns);
        };

        update();
        lists.forEach((l) => l.addEventListener("change", update));

        return () => lists.forEach((l) => l.removeEventListener("change", update));
    }, []);

    return columns;
};

// Distributes photos into columns by dropping each one into whichever column is
// currently shortest. CSS `columns` would be simpler, but it fills top-to-bottom
// per column, which scrambles the chronological order the photos are sorted in.
const distribute = (photos: IPhoto[], columnCount: number) => {
    const columns: { photo: IPhoto; index: number }[][] = Array.from(
        { length: columnCount },
        () => []
    );
    const heights = new Array(columnCount).fill(0);

    photos.forEach((photo, index) => {
        const shortest = heights.indexOf(Math.min(...heights));

        columns[shortest].push({ photo, index });
        heights[shortest] += photo.h / photo.w;
    });

    return columns;
};

interface IMasonryGridProps {
    year: string;
    photos: IPhoto[];
}

const MasonryGrid: React.FC<IMasonryGridProps> = ({ year, photos }) => {
    const columnCount = useColumnCount();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const columns = distribute(photos, columnCount);

    return (
        <>
            <div className="flex gap-4 items-start">
                {columns.map((column, columnIndex) => (
                    <div className="flex-1 flex flex-col gap-4" key={columnIndex}>
                        {column.map(({ photo, index }) => (
                            <button
                                key={photo.name}
                                onClick={() => setOpenIndex(index)}
                                aria-label={`Open photo ${index + 1} of ${photos.length}`}
                                className="group relative block w-full overflow-hidden rounded-xl border-[1px] border-solid border-[rgba(255,255,255,0.15)] transition-transform duration-300 hover:-translate-y-1 hover:border-viking-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC31E]"
                            >
                                <Image
                                    src={thumbSrc(year, photo)}
                                    alt={`CS Academy class of ${year}, photo ${index + 1}`}
                                    width={photo.w}
                                    height={photo.h}
                                    priority={index < 4}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    className="w-full h-auto transition-opacity duration-300 group-hover:opacity-85"
                                />
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <Lightbox
                year={year}
                photos={photos}
                index={openIndex}
                setIndex={setOpenIndex}
            />
        </>
    );
};

export default MasonryGrid;
