import { Language } from "./languages";

export interface Info {
    id: string;
    email: string;
    phone: string;
    cv: Record<Language, string>;

    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;

    mapURL: string;
}

export const isInstanceofInfo = (info: any): boolean => {
    return (
        typeof info === "object" &&
        typeof info.email === "string" &&
        typeof info.phone === "string" &&
        typeof info.cv === "object" &&
        typeof info.facebook === "string" &&
        typeof info.instagram === "string" &&
        typeof info.linkedin === "string" &&
        typeof info.twitter === "string" &&
        typeof info.mapURL === "string"
    );
}

