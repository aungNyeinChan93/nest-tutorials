/* eslint-disable prettier/prettier */
import { AuthUser } from './../users/types/users.types';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshAuthGuard } from './guard/refresh-auth.guard';
import { Role } from './decorators/role.decorator';
import { RoleGuard } from './guard/role.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() { user }: { user: AuthUser }) {
    return this.authService.lgoin(user);
  };

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() { user }: { user: AuthUser }) {
    return user;
  }

  @UseGuards(RefreshAuthGuard)
  @Get('generate-token')
  generateToken(@Req() { user }: { user: AuthUser }) {
    return this.authService.regenerateToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() { user }: { user: AuthUser }) {
    return this.authService.logout(user);
  }

  @Role('user', 'admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('dashboard')
  dashboard(@Req() { user }: { user: AuthUser }) {
    return user;
  }

}
