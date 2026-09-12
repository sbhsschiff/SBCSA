"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Modal from "../Modal";
import { IPhoto, fullSrc } from "./photos";

interface ILightboxProps {
    year: string;
    photos: IPhoto[];
    index: number | null;
    setIndex: (index: number | null) => void;
}

const Lightbox: React.FC<ILightboxProps> = ({ year, photos, index, setIndex }) => {
    const open = index !== null;

    const step = useCallback(
        (delta: number) => {
            if (index === null) return;
            setIndex((index + delta + photos.length) % photos.length);
        },
        [index, photos.length, setIndex]
    );

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") step(-1);
            if (e.key === "ArrowRight") step(1);
            if (e.key === "Escape") setIndex(null);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, step, setIndex]);

    const photo = index === null ? null : photos[index];

    return (
        <Modal
            open={open}
            fullWidth={true}
            className="!max-w-[95vw]"
            setOpen={() => setIndex(null)}
        >
            <div className="relative w-full h-[calc(100vh-120px)] flex items-center justify-center">
                {photo && (
                    <Image
                        key={photo.name}
                        src={fullSrc(year, photo)}
                        alt={`CS Academy class of ${year}, photo ${(index ?? 0) + 1}`}
                        fill
                        sizes="95vw"
                        priority
                        className="object-contain"
                    />
                )}

                <button
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[rgba(0,0,0,0.5)] hover:opacity-70 transition-opacity"
                >
                    <FaChevronLeft size={20} />
                </button>
                <button
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[rgba(0,0,0,0.5)] hover:opacity-70 transition-opacity"
                >
                    <FaChevronRight size={20} />
                </button>

                <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[rgba(255,255,255,0.75)] text-sm">
                    {(index ?? 0) + 1} of {photos.length}
                </p>
            </div>
        </Modal>
    );
};

export default Lightbox;
