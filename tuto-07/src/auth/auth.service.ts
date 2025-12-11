/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtAuthPayload, ValidatedUser, ValidateUser } from './types/auth.types';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config'
import * as argon from 'argon2'

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
        const hashRefreshToken = await argon.hash(refreshToken);
        const updateSuccess = await this.userService.updateHashRefreshToken({ userId: user?.id, hashRefreshToken })
        if (!updateSuccess) throw new ConflictException('user login fail!');
        return { user, token, refreshToken }
    };


    async generateTokens(user: ValidatedUser) {
        const payload: JwtAuthPayload = { email: user?.email, sub: user?.id };
        const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
        const refreshToken = await this.jwtService.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '1h' });
        return { token, refreshToken };
    }

    async verifyRefreshToken({ user, refreshToken }: { user: ValidatedUser, refreshToken: string }) {
        const logger = new Logger(AuthService.name)
        try {
            const isSuccess = await argon.verify(user?.hashRefreshToken as string, refreshToken);
            if (!isSuccess) throw new UnauthorizedException('refresh token is invalid!')
            return true;
        } catch (error) {
            // console.log(error instanceof Error ? error?.message : 'error');
            logger.error(error instanceof Error ? error?.message : 'cerifyToken fail!')
        }
    }

    async genereateAccessToken(user: ValidatedUser) {
        const payload: JwtAuthPayload = { sub: user?.id, email: user?.email };
        const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' })
        return { token };
    }

    async signOut(userId: number) {
        const isSuccess = await this.userService.updateHashRefreshToken({ userId, hashRefreshToken: null })
        if (!isSuccess) throw new ConflictException('user logout fail!')
        return { message: 'logout success!' };
    }

}
