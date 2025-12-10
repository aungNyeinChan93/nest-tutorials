/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ValidateUser } from './types/authUser.type';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshJwtAuthGuard } from './guard/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() { user }: { user: ValidateUser }) {
    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() { user }: { user: ValidateUser }) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtAuthGuard)
  @Get('refresh')
  refresh(@Req() { user }: { user: ValidateUser }) {
    return this.authService.refresh(user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  signOut(@Req() { user }: { user: ValidateUser }) {
    return this.authService.signOut(user);
  }
}
