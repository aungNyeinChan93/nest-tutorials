/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';



export const IS_PUBLIC_KEY = 'public';
export const Public = (isPublic: boolean = true) => SetMetadata(IS_PUBLIC_KEY, isPublic);
