/* eslint-disable prettier/prettier */



export type ValidateUser = {
    id: number;
    name: string;
    email: string;
};


export type JwtAuthPayload = {
    sub: number;
    email: string
}