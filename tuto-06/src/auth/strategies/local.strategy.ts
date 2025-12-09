/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { ValidateUser } from "../types/authUser.type";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string): Promise<ValidateUser> {
        const user = await this.authService.userValidate({ email, password })
        return user;
    }
}