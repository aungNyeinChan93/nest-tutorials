/* eslint-disable no-unsafe-optional-chaining */

/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_KEY } from '../decorators/admin.decorator';
import { UserRoles } from 'src/users/types/users.types';
import { ValidatedUser } from '../types/auth.types';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) { };

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const admin = this.reflector.getAllAndOverride<UserRoles.admin>(ADMIN_KEY, [
      context?.getClass(),
      context.getHandler(),
    ]);

    const { user }: { user: ValidatedUser } = context?.switchToHttp().getRequest();

    return user?.role === admin;
  }
}
