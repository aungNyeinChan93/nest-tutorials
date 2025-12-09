/* eslint-disable prettier/prettier */



export type ValidateUser = {
    id: number;
    name: string;
    email: string;
};


export type AuthJwtPayload = {
    sub: number;
    email: string;
}