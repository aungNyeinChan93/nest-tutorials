/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import 'dotenv/config'
import { JwtAuthPayload, ValidateUser } from "../types/authUser.type";
import { UsersService } from "src/users/users.service";


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {


    constructor(
        private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_REFRESH_SECRET!
        })
    }



    async validate(payload: JwtAuthPayload): Promise<ValidateUser> {
        const user = await this.userService.findByEmail(payload?.email);
        const { password: _p, ...result } = user;
        return result;
    }

}