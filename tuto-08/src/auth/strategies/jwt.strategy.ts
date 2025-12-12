/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import 'dotenv/config'
import { AuthUser, JwtAuthPayload } from "src/users/types/users.types";
import { UsersService } from "src/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(
        private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET!
        })
    }

    async validate(payload: JwtAuthPayload): Promise<AuthUser> {
        const user = await this.userService.findByEmail(payload?.email);
        const { password, ...result } = user;
        return result as AuthUser;
    }

}