import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  @SubscribeMessage('chat')
  handleChat(@MessageBody() chat, @ConnectedSocket() socket: Socket) {
    socket.emit('chat', chat);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDisconnect(client: any) {}
}
