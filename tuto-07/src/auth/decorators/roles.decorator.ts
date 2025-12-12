/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/users/types/users.types';



export const ROLES_KEY = 'roles';
export const Roles = (...roles: [UserRoles, ...UserRoles[]]) => SetMetadata(ROLES_KEY, roles);
