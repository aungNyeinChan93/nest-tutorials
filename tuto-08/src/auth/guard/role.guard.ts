/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthUser, UserRole } from 'src/users/types/users.types';
import { ROLE_KEY } from '../decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles: UserRole[] = this.reflector.getAllAndOverride<UserRole[]>(ROLE_KEY, [
      context?.getClass(),
      context?.getHandler(),
    ]);

    if (!roles) return true;

    const { user }: { user: AuthUser } = context?.switchToHttp().getRequest();

    const isAuthenticate = roles?.some(r => r.includes(user?.role))
    return isAuthenticate;
  }
}
