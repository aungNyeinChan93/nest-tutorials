/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from 'src/users/types/users.types';

export const CurrentUser = createParamDecorator((_data: any, ctx: ExecutionContext) => {
    const { user }: { user: AuthUser } = ctx.switchToHttp().getRequest();
    return user;
})
