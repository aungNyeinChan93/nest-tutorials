/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AuthService } from './../auth.service';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import 'dotenv/config'
import { GoogleUserDto } from '../dto/google-user.dto';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
            scope: ['email', 'profile'],
        })
    }


    async validate(_acessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) {
        const googleUserDto: GoogleUserDto = {
            name: profile.displayName,
            email: profile.emails[0].value
        }
        const user = await this.authService.validateGoolgleUser(googleUserDto)
        done(null, user);
    }


}