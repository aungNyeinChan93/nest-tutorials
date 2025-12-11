/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtAuthPayload, ValidatedUser, ValidateUser } from './types/auth.types';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config'


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { };


    async userValidate(validateUser: ValidateUser): Promise<ValidatedUser> {
        const user = await this.userService.findByEmail({ email: validateUser?.email });
        if (!user) throw new UnauthorizedException('user is not unauthorize!')
        const isPasswordCorrect = await compare(validateUser?.password, user?.password);
        if (!isPasswordCorrect) throw new UnauthorizedException('user credential is not correct!')
        const { password, ...result } = user;
        return result as ValidatedUser;
    };


    async signIn(user: ValidatedUser) {
        const { token, refreshToken } = await this.generateTokens(user);
        return { user, token, refreshToken }
    };


    async generateTokens(user: ValidatedUser) {
        const payload: JwtAuthPayload = { email: user?.email, sub: user?.id };
        const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
        const refreshToken = await this.jwtService.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '1h' });
        return { token, refreshToken };
    }

}
