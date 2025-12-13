/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { type AuthUser, UserRole } from 'src/users/types/users.types';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshAuthGuard } from './guard/refresh-auth.guard';
import { RoleGuard } from './guard/role.guard';
import { Role } from './decorator/role.decorator';
import { CurrentUser } from './decorator/current-user.decorator';
import { Public } from './decorator/public.decorator';
import { GoogleAuthGuard } from './guard/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public(true)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() { user }: { user: AuthUser }) {
    return this.authService.login(user);
  }

  // @UseGuards(JwtAuthGuard) //GLOBAL USER JWTAUTHGUARD
  @Get('profile')
  profile(@Req() { user }: { user: AuthUser }) {
    return user;
  }

  @Public(true)
  @UseGuards(RefreshAuthGuard)
  @Get('generate-token')
  generateToken(@Req() { user }: { user: AuthUser }) {
    return this.authService.generateToken(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() { user }: { user: AuthUser }) {
    return this.authService.logout(user);
  }

  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('admin')
  adminOnly(@Req() { user }: { user: AuthUser }) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  detail(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Get('test-one')  //for global jwtAuthGuard
  testOne(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Public(true)
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }


  @Public(true)
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() { user }: { user: AuthUser }) {
    return this.authService.login(user);
  }
}
