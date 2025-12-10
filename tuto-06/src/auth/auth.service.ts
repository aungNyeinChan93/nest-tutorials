/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'
import { JwtAuthPayload, ValidateUser } from './types/authUser.type';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2'
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwt: JwtService
    ) { };


    async userValidate({ email, password }: { email: string, password: string }): Promise<ValidateUser> {
        const user = await this.userService.findByEmail(email);
        const isCorrectPassword = await compare(password, user?.password)
        if (!isCorrectPassword) throw new UnauthorizedException('credential is not correct!@')
        const { password: _p, ...result } = user;
        return result as ValidateUser;
    };

    async login(user: ValidateUser) {
        const payload: JwtAuthPayload = { sub: user?.id, email: user?.email };
        const [token, refreshToken] = await this.generateTokens(payload);
        const hashRefreshToken = await hash(refreshToken);
        await this.userService.updatehashRefreshToken({ userId: user?.id, hashRefreshToken })
        return { user, token, refreshToken };
    };

    async generateTokens(payload: JwtAuthPayload): Promise<[token: string, refreshToken: string]> {
        const [token, refreshToken] = await Promise.all([
            this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' }),
            this.jwt.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }),
        ]);
        return [token, refreshToken];
    };

    refresh(user: ValidateUser) {
        const payload: JwtAuthPayload = { sub: user?.id, email: user?.email };
        const token = this.jwt.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
        return { token };
    };


    async signOut(user: ValidateUser) {
        const { affected } = await this.userService.updatehashRefreshToken({ userId: user?.id, hashRefreshToken: null })
        if (!affected) throw new ConflictException('sign-out fail');
        return 'success sign-out!';
    }



}
