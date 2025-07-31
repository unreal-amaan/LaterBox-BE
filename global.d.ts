export type TokenPayload = {
    id: string;
    name: string;
    email: string;
} 

export type createCategoryPayload = {
    title?: string,
    created_at: Date,
    userId: string
}
