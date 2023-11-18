import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chat.entity';
import { Room } from './room.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Chat, Room])],
  providers: [ChatGateway],
})
export class ChatModule {}
