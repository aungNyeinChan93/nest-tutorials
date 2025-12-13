/* eslint-disable prettier/prettier */
import { AuthUser } from './../users/types/users.types';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() { user }: { user: AuthUser }) {
    return user;
  }
}
