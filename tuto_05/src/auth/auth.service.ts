/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload, ValidateUser } from './types/validateUser.type';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwt: JwtService,
    ) { };

    async validatUser({ email, password }: { email: string, password: string }): Promise<ValidateUser> {
        const user = await this.userService.findByEmail(email);
        const isCorrectPassword = await compare(password, user?.password)
        if (!isCorrectPassword) throw new UnauthorizedException('user credential is not correct!');
        const { password: p, ...result } = user;
        return result as ValidateUser;
    };

    login(user: ValidateUser) {
        const payload: AuthJwtPayload = { sub: user?.id, email: user?.email };
        const token = payload && this.jwt.sign(payload);
        return { user, token }
    }

}
