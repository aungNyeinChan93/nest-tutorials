/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'
import { AuthUser } from 'src/users/types/users.types';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './types/auth.types';
import 'dotenv/config';
import { hash } from 'argon2'
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser({ email, password }: { email: string, password: string }) {
        const user = await this.userService.findByEmail(email);

        if (!user) throw new NotFoundException('USER  NOT FOUND')

        const isPasswordVerify = await compare(password, user?.password);

        if (!isPasswordVerify) throw new UnauthorizedException('credential is not correct!')

        const { password: _p, ...result } = user;

        return result as AuthUser;
    }


    async lgoin(user: AuthUser) {
        const payload: JwtAuthPayload = { sub: user?.id, email: user?.email };
        const { token, refreshToken } = await this.generateTokens(payload)
        const hashRefreshToken = await hash(refreshToken)
        const isSuccess = await this.userService.updateRefreshToken(user?.id, hashRefreshToken)
        if (!isSuccess) throw new UnauthorizedException('Refresh Token is invalid!')
        return { user, token, refreshToken };
    };


    async generateTokens(payload: JwtAuthPayload) {
        const [token, refreshToken] = await Promise.all([
            await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' }),
            await this.jwtService.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' })
        ]);
        return { token, refreshToken };
    };


    async regenerateToken(user: AuthUser) {
        const payload: JwtAuthPayload = { sub: user?.id, email: user?.email };
        const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' })
        return { token };
    }

    async logout(user: AuthUser) {
        // user.hashRefreshToken = null;
        const isLogout = await this.userService.updateRefreshToken(user?.id, null)
        if (!isLogout) throw new ConflictException('Logout fail')
        return { message: 'logout success!' }
    }

}
