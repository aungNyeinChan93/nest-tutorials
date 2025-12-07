/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateUserProfileDto } from "./create-userProfile.dto";
// import { UserProfile } from "../entities/userProfile.entity";

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

    // @IsOptional()
    // userProfile: UserProfile

    @IsOptional()
    userProfile: CreateUserProfileDto

    @IsOptional()
    bio: string;
}
