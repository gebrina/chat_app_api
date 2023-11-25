import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private chatRepo: Repository<Chat>) {}

  async find(): Promise<Chat[]> {
    return await this.chatRepo.find();
  }

  async create(chat: Chat): Promise<Chat> {
    return await this.chatRepo.save(chat);
  }
}
