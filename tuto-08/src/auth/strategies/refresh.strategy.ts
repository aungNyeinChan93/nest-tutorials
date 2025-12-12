/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtAuthPayload } from "src/users/types/users.types";
import 'dotenv/config'
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";

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


    async validate(req: Request, payload: JwtAuthPayload) {
        const refreshToken = req.get('authorization')?.split(' ')[1].trim();
        if (!refreshToken) throw new NotFoundException('refresh token is invalid!')

        const user = await this.userService.findByEmail(payload?.email);

        const isVerify = await this.authService.verifyRefreshToken({ user, refreshToken })

        if (!isVerify) throw new UnauthorizedException('refresh token invalid')

        const { password, ...result } = user;
        return result;
    }

}