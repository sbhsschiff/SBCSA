import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IFolderProps {
    year: number;
    hasPhotos: boolean;
}

const Folder : React.FC<IFolderProps> = ({ hasPhotos, year }) => {
    return (
        <Link 
            href={hasPhotos ? `/gallery/${year}` : `/gallery`}>
            <div 
                className="relative w-[300px] h-[300px] flex justify-center items-center">
                <svg 
                    className="absolute"
                    width="301" 
                    height="271" 
                    viewBox="0 0 301 271" 
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M14 70H7V77V252C7 258.627 12.3726 264 19 264H282C288.627 264 294 258.627 294 252V77V70H287H14Z" 
                        stroke={hasPhotos ? "#FEC31E" : "#ffffff"}
                        strokeWidth="14"
                    />
                    <path 
                        d="M287 68H294V61V49.1789C294 42.5515 288.627 37.1789 282 37.1789H101.518L85.5641 12.4875C83.3535 9.06625 79.5584 7 75.4851 7H19C12.3726 7 7 12.3726 7 19V44.1789V61V68H14H287Z" 
                        stroke={hasPhotos ? "#FEC31E" : "#ffffff"}
                        strokeWidth="14"
                    />
                </svg>
                <div className="relative top-[10%]">
                    <p className="text-white text-lg font-light uppercase text-center">Class of</p>
                    <p className="text-white text-6xl font-bold">{year}</p>
                    {
                        !hasPhotos && (
                            <p className="text-white text-lg font-light uppercase text-center">Coming Soon</p>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default Folder;