/* eslint-disable prettier/prettier */

import { IsOptional } from "class-validator";


export class CreateUserProfileDto {
    @IsOptional()
    bio: string;

    @IsOptional()
    avator: string;

    @IsOptional()
    isEmailVerify: boolean;

    @IsOptional()
    user_id: number;
}