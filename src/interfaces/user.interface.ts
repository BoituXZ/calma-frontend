export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'THERAPIST' | 'ADMIN';
    createdAt: string;
}

export interface UpdateUserProfileRequest {
    name?: string;
    email?: string;
}
