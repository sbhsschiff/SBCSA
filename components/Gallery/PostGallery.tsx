import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DotButton, useDotButton } from "./dot";
import clsx from "clsx";

interface IPostImage {
    src: string;
}

export interface IPostGalleryProps {
    slides: IPostImage[]
}

const PostGallery : React.FC<IPostGalleryProps> = ({ slides }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    
    const onNextButtonClick = () => {
        emblaApi?.scrollNext();
    }

    const onPrevButtonClick = () => {
        emblaApi?.scrollPrev();
    }

    const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi)

    return (
        <div className="embla__viewport h-full overflow-hidden" ref={emblaRef}>
            <div className="embla__container h-full flex">
                {slides.map(({ src }, index) => (
                    <div 
                        className="embla__slide h-full relative" 
                        style={{ flex: "0 0 100%" }} 
                        key={index}
                    >
                       <Image
                            src={src || ""}
                            alt={"Instagram Post"}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-top object-contain"
                        />
                    </div>
                ))}
            </div>
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
            >
                {
                    scrollSnaps.map((_, i) => {
                        return <DotButton 
                            className={clsx(
                                "w-2 h-2 rounded-full bg-white mx-1 hover:opacity-70 transition-opacity",
                                i === selectedIndex && "opacity-70"
                            )}
                            onClick={() => onDotButtonClick(i)}
                            key={i} 
                        />
                    })
                }
            </div>
            <button 
                className="absolute top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                onClick={onPrevButtonClick}>
                    <FaChevronLeft size={20} />
            </button>
            <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                onClick={onNextButtonClick}>
                    <FaChevronRight size={20} />
            </button>
       </div>
    )
}

export default PostGallery;