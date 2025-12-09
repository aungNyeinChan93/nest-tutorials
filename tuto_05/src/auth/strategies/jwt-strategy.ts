/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/validateUser.type";
import "dotenv/config"


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('Missing JWT_SECRET environment variable');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: secret,
        })
    }

    validate(payload: AuthJwtPayload) {
        return { id: payload?.sub, email: payload?.email }
    }

}