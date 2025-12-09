/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
    ) { }

    async validateUser({ email, password }: { email: string, password: string }) {
        const user = await this.userService.findByEmail(email);
        const isPasswordCorrect = await compare(password, user?.password);
        if (!isPasswordCorrect) throw new UnauthorizedException('user credential is not correct!');
        const { password: _p, ...result } = user;
        return result;
    }
}
