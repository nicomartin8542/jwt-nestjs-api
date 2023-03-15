import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/auth-public.decorator';
import { Roles } from './auth/roles-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly autService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() { user }) {
    return this.autService.login(user);
  }

  @Roles('admin')
  @Get('profile')
  getProfile(@Request() req): string {
    return req.user;
  }
}
