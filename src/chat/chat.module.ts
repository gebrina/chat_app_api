import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Chat } from 'src/entities/chat.entity';
import { Room } from 'src/entities/room.entity';
import { RoomModule } from 'src/room/room.module';
import { ChatService } from './chat.service';
import { UserModule } from 'src/user/user.module';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Chat, Room]),
    RoomModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
