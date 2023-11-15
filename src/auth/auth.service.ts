import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUserName(username);

    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null;
    const { password: userPass, ...rest } = user;
    return rest;
  }
}
