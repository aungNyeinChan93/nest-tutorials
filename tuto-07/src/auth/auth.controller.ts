/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { type ValidatedUser } from './types/auth.types';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshJwtAuthGuard } from './guard/refresh-jwt-auth.guard';
import { RoleGuard } from './guard/role.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRoles } from 'src/users/types/users.types';
import { Admin } from './decorators/admin.decorator';
import { AdminGuard } from './guard/admin.guard';

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
  }

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

  @Roles(UserRoles.admin, UserRoles.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('only-auth')
  onlyUser(@Req() { user }: { user: ValidatedUser }) {
    return user;
  }

  @Admin()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('only-admin')
  onlyAdmin(@Req() { user }: { user: ValidatedUser }) {
    return user;
  }

}
