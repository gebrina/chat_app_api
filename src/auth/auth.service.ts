import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    if (!user) {
      throw new UnauthorizedException(
        HttpStatus.UNAUTHORIZED,
        'Invalid username or password',
      );
    }
    this.validateUser(username, password);
  }

  async validateUser(username: string, password: string) {}
}
