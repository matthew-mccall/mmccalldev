export interface Content {
    title?: string;
    date: string;
    icon: string;
    link?: string;
    image?: string | null;
    overlay?: boolean;
    color?: string | null;
    description?: string | null;
    value?: number | null;
}

export type ContentProvider = () => Promise<Promise<Content>[]>;