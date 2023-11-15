import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    if (!user) return null;
    return {
      username,
      password,
    };
  }

  async singIn({ username, password }: User) {
    const user = await this.userService.findByUserName(username);
    if (!user) throw new UnauthorizedException('Invalid username');
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Invalid password');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPass, ...rest } = user;
    return {
      access_token: this.jwtService.sign({ sub: rest.id, user: rest }),
    };
  }
}
