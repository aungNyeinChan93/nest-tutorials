/* eslint-disable @typescript-eslint/no-unused-vars */

import { AuthService } from './../auth.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';
import { Request } from 'express';
import { JwtAuthPayload } from '../types/auth.types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtAuthPayload) {
    const refreshToken = req.get('authorization')?.split(' ')[1];
    if (!refreshToken) throw new NotFoundException('refresh token not found!');
    const user = await this.userService.findByEmail({ email: payload?.email });
    const isUserVerify = await this.authService.verifyRefreshToken({
      user,
      refreshToken,
    });
    if (!isUserVerify)
      throw new UnauthorizedException('refresh token is invalid');
    const { password, ...result } = user;
    return result;
  }
}
