/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { ValidateUser } from '../types/validateUser.type';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authService: AuthService,
    ) {
        super({
            usernameField: 'email',
        })
    }

    async validate(email: string, password: string): Promise<ValidateUser> {
        const user = await this.authService.validatUser({ email, password })
        return user;
    }
}
