/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/types/users.types';


export const ROLE_KEY = 'roles';
export const Role = (...roles: [UserRole, ...UserRole[]]) => SetMetadata(ROLE_KEY, roles);
