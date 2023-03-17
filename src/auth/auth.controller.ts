import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { Public } from './decorators/auth-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() { user }) {
    return this.authService.login(user);
  }

  @Roles('admin')
  @Get('profile')
  getProfile(@Request() req): string {
    return req.user;
  }
}
