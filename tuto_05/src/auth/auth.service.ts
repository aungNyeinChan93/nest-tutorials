/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
    ) { };

    async validatUser({ email, password }: { email: string, password: string }) {
        const user = await this.userService.findByEmail(email);
        const isCorrectPassword = await compare(password, user?.password)
        if (!isCorrectPassword) throw new UnauthorizedException('user credential is not correct!');
        const { password: p, ...result } = user;
        return result;
    }

}
