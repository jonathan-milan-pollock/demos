import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {} from 'ws';

interface WsClient {
  send(message: string): void;
}

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  readonly wsClients: WsClient[] = [];

  handleConnection(client: WsClient): void {
    Logger.log('connecting client', MessagesGateway.name);
    this.wsClients.push(client);
  }

  handleDisconnect(client: WsClient): void {
    Logger.log('disconnecting client', MessagesGateway.name);
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
  }

  @SubscribeMessage('messageToServer')
  handleMessage(@MessageBody() message: string): void {
    this.wsClients.forEach((c) => {
      // add the comment
      // send the comment added response back
      // add the emotion
      // send the emotion added response back
      c.send(message);
    });
  }
}
