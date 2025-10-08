export enum UserRole {
    Admin = "admin",
    User = "user"
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: UserRole;          
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}