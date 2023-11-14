import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async findByUserName(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
    return id;
  }
}
