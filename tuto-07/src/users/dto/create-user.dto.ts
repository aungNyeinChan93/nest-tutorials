/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../types/users.types';

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
  hashRefreshToken: string;

  @IsOptional()
  role: UserRoles
}
