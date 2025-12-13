/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'
import { AuthUser } from 'src/users/types/users.types';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
    ) { }

    async validateUser({ email, password }: { email: string, password: string }) {
        const user = await this.userService.findByEmail(email);


        if (!user) throw new NotFoundException('USER  NOT FOUND')

        const isPasswordVerify = await compare(password, user?.password);

        if (!isPasswordVerify) throw new UnauthorizedException('credential is not correct!')

        const { password: _p, ...result } = user;

        return result as AuthUser;
    }

}
