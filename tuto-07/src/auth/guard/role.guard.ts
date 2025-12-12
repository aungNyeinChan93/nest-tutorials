/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/users/types/users.types';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ValidatedUser } from '../types/auth.types';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) { }


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles: UserRoles[] = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context?.getClass(),
      context?.getHandler(),
    ]);

    const { user }: { user: ValidatedUser } = context.switchToHttp().getRequest();

    const isAuthourize = roles?.some(r => r.includes(user?.role))

    return isAuthourize;
  }
}
