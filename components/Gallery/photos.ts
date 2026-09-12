import photos from "@/common/data/gallery-photos.json";

export interface IPhoto {
    name: string;
    w: number;
    h: number;
    date: string | null;
}

const manifest = photos as Record<string, IPhoto[]>;

export const getYears = () => Object.keys(manifest).sort();

export const getPhotos = (year: string | number): IPhoto[] => manifest[String(year)] ?? [];

export const thumbSrc = (year: string | number, photo: IPhoto) =>
    `/gallery/${year}/thumbs/${photo.name}.webp`;

export const fullSrc = (year: string | number, photo: IPhoto) =>
    `/gallery/${year}/full/${photo.name}.webp`;
