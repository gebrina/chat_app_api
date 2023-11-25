import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Chat } from 'src/entities/chat.entity';
import { Room } from 'src/entities/room.entity';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Chat, Room]), RoomModule],
  providers: [ChatGateway],
})
export class ChatModule {}
