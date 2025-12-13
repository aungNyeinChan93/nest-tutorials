/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthUser, JwtAuthPayload, UserRole } from './../users/types/users.types';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { };

    async userValidate({ email, password }: { email: string, password: string }): Promise<AuthUser> {
        const user = await this.userService.findByEmail(email);

        const isVerifypassword = await compare(password, user.password)

        if (!isVerifypassword) throw new UnauthorizedException('user is not authorize')

        const { password: _p, ...result } = user;

        return result as AuthUser;
    };


    async generateTokens({ id, email }: { id: number, email: string }) {
        const payload: JwtAuthPayload = { sub: id, email };

        const [token, refreshToken] = await Promise.all([
            await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' }),
            await this.jwtService.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }),
        ])

        return { token, refreshToken };
    };


    async login(user: AuthUser) {
        const { token, refreshToken } = await this.generateTokens({ id: user?.id, email: user?.email });
        const hashRefreshToken = await argon.hash(refreshToken);
        const isSuccess = await this.userService.updateHashRefreshToken({ userId: user?.id, refreshToken: hashRefreshToken })
        if (!isSuccess) throw new UnauthorizedException('Refersh Token is invalid!')
        return { user, token, refreshToken }
    }

    async verifyRefreshToken({ user, refreshToken }: { user: AuthUser, refreshToken: string }) {
        try {
            const isVerify = await argon.verify(user.hashRefreshToken as string, refreshToken)
            if (!isVerify) throw new UnauthorizedException('refreshToken invalid!')
            return isVerify;
        } catch (error) {
            throw new UnauthorizedException(error instanceof Error ? error?.message : 'refresh token invalid!')
        }
    }

    generateToken(user: AuthUser) {
        const payload: JwtAuthPayload = { sub: user?.id, email: user?.email };
        const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' })
        return { token };
    }

    async logout(user: AuthUser) {
        const isSuccess = await this.userService.updateHashRefreshToken({ userId: user?.id, refreshToken: null })
        if (!isSuccess) throw new ConflictException('logout fail')
        return { message: 'logout success!' }
    }

    async validateGoolgleUser(googleUser: GoogleUserDto) {
        const user = await this.userService.findOneByEmail(googleUser?.email);

        if (!user) {
            const createUserDto: CreateUserDto = {
                email: googleUser?.email,
                name: googleUser?.name,
                hashrefreshToken: null,
                password: '',
                role: UserRole.guest
            };
            return await this.userService.create(createUserDto);

        }

        return user;
    }

}
