/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";


export class GoogleUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;


}
