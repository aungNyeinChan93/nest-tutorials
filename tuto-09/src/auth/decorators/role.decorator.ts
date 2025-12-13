/* eslint-disable prettier/prettier */
import { type UserRole } from './../../users/schema/user.schema';
import { SetMetadata } from '@nestjs/common';


export const ROLE_KEY = 'roles';
export const Role = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);


