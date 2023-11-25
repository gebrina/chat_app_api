import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from 'src/entities/chat.entity';
import { PublicApi } from 'src/decorators/public-api';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @PublicApi()
  @Get(':roomname')
  async find(@Param('roomname') roomName: string): Promise<Chat[]> {
    return await this.chatService.findChatsByRoom(roomName);
  }
}
