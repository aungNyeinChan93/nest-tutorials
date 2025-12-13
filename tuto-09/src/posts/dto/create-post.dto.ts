/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreatePost } from "../types/posts.types";



export class CreatePostDto implements CreatePost {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    author_id?: string | null | undefined;
}
