/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import 'dotenv/config'
import { JwtAuthPayload, ValidateUser } from "../types/authUser.type";
import { UsersService } from "src/users/users.service";
import { Request } from 'express';


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {


    constructor(
        private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET!,
            passReqToCallback: true,

        })
    }

    async validate(request: Request, payload: JwtAuthPayload): Promise<ValidateUser> {
        const refreshToken = request.get('authorization')?.split(' ')[1].trim();
        // TODO - validate refresh token with hashRefreshToken from entity
        const user = await this.userService.findByEmail(payload?.email);
        const isvalidate = await this.userService.validateRefreshToken({ userId: user?.id, refreshToken: refreshToken! })
        if (!isvalidate) throw new UnauthorizedException('authentication fail!');
        const { password: _p, ...result } = user;
        return result;
    }

}