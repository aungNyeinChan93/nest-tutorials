/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'
import { JwtAuthPayload, ValidateUser } from './types/authUser.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwt: JwtService
    ) { }


    async userValidate({ email, password }: { email: string, password: string }): Promise<ValidateUser> {
        const user = await this.userService.findByEmail(email);
        const isCorrectPassword = await compare(password, user?.password)
        if (!isCorrectPassword) throw new UnauthorizedException('credential is not correct!@')
        const { password: _p, ...result } = user;
        return result as ValidateUser;
    }

    login(user: ValidateUser) {
        const payload: JwtAuthPayload = { sub: user?.id, email: user?.email }
        const token = this.jwt.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
        const refreshToken = this.jwt.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' })
        return { user, token, refreshToken };
    }

    refresh(user: ValidateUser) {
        const payload: JwtAuthPayload = { sub: user?.id, email: user?.email };
        const token = this.jwt.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
        return { token };

    }
}
