/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { type ValidatedUser } from './types/auth.types';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshJwtAuthGuard } from './guard/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() { user }: { user: ValidatedUser }) {
    return this.authService.signIn(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() { user }: { user: ValidatedUser }) {
    return user;
  };

  @UseGuards(RefreshJwtAuthGuard)
  @Post('generate-token')
  generateAccessToken(@Req() { user }: { user: ValidatedUser }) {
    return this.authService.genereateAccessToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  signOut(@Req() { user }: { user: ValidatedUser }) {
    return this.authService.signOut(user?.id);
  }



}
