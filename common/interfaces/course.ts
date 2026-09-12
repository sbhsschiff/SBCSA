import {Link} from "./link"

export interface Course{
    name: string,
    grade: number,
    weighting: string,
    credits: number, 
    // Extra items appended to the "11th Grade * AP Weighting * 5 Credits" line.
    details?: string[],
    image_path?: string,
    description: string,
    links?: Link[],
    teachers?: string[],
    warnings?: string[],
    infoLabels?: string[],
    tags?: string[],
    prereqs: PreReq[]
}

export interface PreReq{
    class: string,
    grade: string
}