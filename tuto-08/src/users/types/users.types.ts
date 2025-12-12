/* eslint-disable prettier/prettier */


export enum UserRole {
    guest = 'guest',
    user = 'user',
    admin = 'admin',
}


export type AuthUser = {
    id: number;
    name: string;
    email: string;
    hashRefreshToken: string | null | undefined;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
};


export type JwtAuthPayload = {
    sub: number;
    email: string;
}