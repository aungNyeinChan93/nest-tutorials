/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../types/users.types";


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    hashrefreshToken: string | null;

    @IsOptional()
    role: UserRole

}
