/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { type UserRole } from 'src/users/schema/user.schema';
import { ROLE_KEY } from '../decorators/role.decorator';
import { AuthUser } from 'src/users/types/users.types';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const user: AuthUser = context.switchToHttp().getRequest().user;
    if (!user) throw new UnauthorizedException('user is not authorized')

    const isAuthorize = roles?.some(role => role.includes(user?.role as string))

    return isAuthorize;
  }
}
