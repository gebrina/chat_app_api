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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService,
    private roomService: RoomService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('init-chat')
  async handleChat(
    @MessageBody() roomName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(roomName);
  }

  @SubscribeMessage('message')
  handleChatMessages(@MessageBody() chat: Chat) {
    const {
      room: { name },
    } = chat;
    this.server.emit(name, chat);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDisconnect(client: any) {}
}
