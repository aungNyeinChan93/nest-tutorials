/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    author_id: string;

}
