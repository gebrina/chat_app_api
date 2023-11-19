import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { PublicApi } from 'src/decorators/public-api';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @PublicApi()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @PublicApi()
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('')
  @PublicApi()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  @PublicApi()
  delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
