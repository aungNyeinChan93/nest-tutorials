/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUser } from './../types/users.types';


export class CreateUserDto implements CreateUser {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    role?: 'guest' | 'user' | 'admin' | null | undefined;

}
