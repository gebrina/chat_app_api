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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  @SubscribeMessage('init-chat')
  handleChat(@MessageBody() msg, @ConnectedSocket() socket: Socket) {
    console.log(socket.id);
  }

  handleConnection(client: any) {
    console.log(client);
  }

  handleDisconnect(client: any) {
    console.log(client);
  }
}
