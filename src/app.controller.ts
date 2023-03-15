import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/auth-public.decorator';
import { Roles } from './auth/decorators/roles-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly autService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() { user }) {
    return this.autService.login(user);
  }

  @Roles('admin', 'user')
  @Get('profile')
  getProfile(@Request() req): string {
    return req.user;
  }
}
