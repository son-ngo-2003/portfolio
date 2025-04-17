import { Language } from "./languages";

export enum BlogType {
    Project = "project",
    Association = "association",
    Art = "art",
    Sport = "sport",
}

export interface Blog {
    id: string;
    image: string | null;
    priority: number;

    title: Record<Language, string>;
    content: Record<Language, string>;

    deleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}

export interface ProjectBlog extends Blog {
    type: BlogType.Project;
    role: string;

    startDate: Date;
    endDate: Date | null;
}

export interface AssociationBlog extends Blog {
    type: BlogType.Association;
    role: string;

    startDate: Date;
    endDate: Date | null;
}

export interface ArtBlog extends Blog {
    type: BlogType.Art;
}

export interface SportBlog extends Blog {
    type: BlogType.Sport;
}

export const isInstanceofBlog = (blog: any): boolean => {
    return (
        typeof blog === "object" &&
        typeof blog.image === "string" &&
        typeof blog.priority === "number" &&
        typeof blog.title === "object" &&
        typeof blog.content === "object"
    );
}