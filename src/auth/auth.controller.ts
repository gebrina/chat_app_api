import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth/login')
export class AuthController {
  constructor(private authService: AuthService) {}
}
