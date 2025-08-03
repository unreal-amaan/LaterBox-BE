export type TokenPayload = {
    id: string;
    name: string;
    email: string;
} 

export type CategoryPayload = {
    title?: string,
    created_at: Date,
    userId: string
}

export type LinkPayload = {
    title: string,
    link: string,
    note: string,
    created_at: Date,
    isPinned: boolean,
    userId: string,
    categoryId: string,
    tags: string[]
}

export type LinkUpdatePayload = {
    title?: string,
    link?: string,
    note?: string,
    isPinned?: boolean,
    tags?: string[]
}