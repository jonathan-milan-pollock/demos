import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';

import { WebSocketClient } from '@dark-rush-photography/api/types';
import { WebSocketMessageProvider } from '@dark-rush-photography/api/data';

@WebSocketGateway()
export class WebSocketMessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly webSocketMessageProvider: WebSocketMessageProvider
  ) {}

  handleConnection(webSocketClient: WebSocketClient): void {
    this.webSocketMessageProvider.handleConnection(webSocketClient);
  }

  handleDisconnect(webSocketClient: WebSocketClient): void {
    this.webSocketMessageProvider.handleDisconnect(webSocketClient);
  }
}
