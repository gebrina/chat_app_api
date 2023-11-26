import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from 'src/entities/chat.entity';
import { ChatService } from './chat.service';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService,
    private roomService: RoomService,
    private userService: UserService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('init-chat')
  async handleChat(
    @MessageBody() roomName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const users = roomName.split('-');

    const tempUsers = [];
    users.forEach(async (u) => {
      const user = await this.userService.findByUserName(u);
      if (user) {
        tempUsers.push(user.id);
      }
    });

    await this.roomService.create({
      name: roomName,
      users: tempUsers,
    } as any);

    socket.join(roomName);
  }

  @SubscribeMessage('message')
  async handleChatMessages(@MessageBody() chat: Chat) {
    const {
      room: { name },
    } = chat;
    const room = await this.roomService.findRoomByName(name);
    if (room) {
      chat.room = room;
      const { id, ...rest } = chat;
      await this.chatService.create(rest as Chat);
      this.server.emit(name, chat);
    }
  }

  @SubscribeMessage('typing')
  handleTypingEvent(
    @MessageBody() roomName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.to(roomName).emit('typing', 'typing');
  }

  @SubscribeMessage('end-chat')
  handleEndChat(
    @MessageBody() roomName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.leave(roomName);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDisconnect(client: any) {}
}
