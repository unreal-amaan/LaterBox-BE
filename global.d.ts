


export type TokenPayload = {
    id: string;
    name: string;
    email: string;
} 

export type Category = {
    id: string;
    title: string;
    created_at: string;
    isPinned: boolean;
    isPublic: boolean;
    shareLink: string | null;
    count: number;
}

export type CreateCategoryPayload = {
    title: string,
    created_at?: Date,
    isPinned: boolean,
    isPublic: boolean,
    userId: string
}

export type UpdateCategoryPayload = {
    title?: string;
    isPinned?: boolean;
    isPublic?: boolean;
};
export type CreateLinkPayload = {
    title: string,
    link: string,
    note: string,
    created_at: Date,
    isPinned: boolean,
    userId: string,
    categoryId: string,
    tags: string[]
}

export type UpdateLinkPayload = {
    title?: string;
    link?: string;
    note?: string;
    isPinned?: boolean;
    tags?: string[];
};