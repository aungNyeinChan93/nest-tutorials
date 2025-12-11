/* eslint-disable prettier/prettier */



export type ValidateUser = {
    email: string;
    password: string
};

export type ValidatedUser = {
    id: number;
    name: string;
    email: string;
    hashRefreshToken?: string | null;
    created_at?: Date;
    updated_at?: Date;
};


export type JwtAuthPayload = {
    sub: number;
    email: string;
}