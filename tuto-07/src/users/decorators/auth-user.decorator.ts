/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ValidatedUser } from 'src/auth/types/auth.types';

export const AuthUser = createParamDecorator(
    (data: any, ctx: ExecutionContext): ValidatedUser => {
        const { user }: { user: ValidatedUser } = ctx.switchToHttp().getRequest();
        console.log({ data });
        return user;
    }
)
