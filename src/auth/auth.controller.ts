import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { PublicApi } from 'src/decorators/public-api';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @PublicApi()
  login(@Request() req) {
    return this.authService.singIn(req.user);
  }
}
