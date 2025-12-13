/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtAuthPayload } from "../types/auth.types";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";
import 'dotenv/config'
import { verify } from 'argon2'
import { AuthUser } from "src/users/types/users.types";


@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {


    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET!,
            passReqToCallback: true
        })
    }

    async validate(req: Request, payload: JwtAuthPayload): Promise<AuthUser> {
        const refreshToken = req.get('authorization')?.split(' ')[1].trim();
        const user = await this.userService.findByEmail(payload?.email);
        if (!refreshToken && !user) throw new UnauthorizedException('refreshToken invalid!')
        try {
            const isVerifyRefreshToken = await verify(user?.hashRefreshToken as string, refreshToken as string)
            if (!isVerifyRefreshToken) throw new BadRequestException('refresh token invalid!')
        } catch (error) {
            throw new UnauthorizedException('REFRESH TOKEN EXPIRE!')
        }
        const { password, ...auth } = user;
        return auth
    }

}