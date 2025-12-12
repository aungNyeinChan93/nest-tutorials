/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/users/types/users.types';


export const ADMIN_KEY = 'admin';
export const Admin = () => SetMetadata(ADMIN_KEY, UserRoles.admin);
