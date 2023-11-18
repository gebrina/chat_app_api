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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  @SubscribeMessage('chat')
  handleChat(@MessageBody() chat, @ConnectedSocket() socket: Socket) {
    socket.join(chat.room);
    this.server.to(chat.room).emit('chat', chat.message);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any) {
    console.log('someone connected');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDisconnect(client: any) {
    console.log('someone disconnected');
  }
}
