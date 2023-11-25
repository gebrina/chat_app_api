import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from 'src/entities/chat.entity';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':roomname')
  async find(@Param('roomname') roomName: string): Promise<Chat[]> {
    return await this.chatService.findChatsByRoom(roomName);
  }
}
