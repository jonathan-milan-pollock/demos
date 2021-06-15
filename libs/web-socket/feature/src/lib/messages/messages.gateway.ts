import { HttpService, Inject, Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { switchMap, take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, WebSocketClient } from '@dark-rush-photography/web-socket/types';
import { HandleMessageProvider } from '@dark-rush-photography/web-socket/data';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  readonly webSocketClients: WebSocketClient[] = [];

  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly handleMessageProvider: HandleMessageProvider
  ) {}

  @SubscribeMessage('messageToServer')
  async handleMessage(@MessageBody() message: string): Promise<void> {
    return await this.handleMessageProvider
      .handleMessage$(this.env, this.httpService, JSON.parse(message))
      .pipe(
        switchMap((responseMessage) =>
          this.handleMessageProvider.broadcastMessage$(
            this.webSocketClients,
            responseMessage
          )
        ),
        take(1)
      )
      .toPromise();
  }

  handleConnection(webSocketClient: WebSocketClient): void {
    Logger.log('connecting client', MessagesGateway.name);
    this.webSocketClients.push(webSocketClient);
  }

  handleDisconnect(webSocketClient: WebSocketClient): void {
    Logger.log('disconnecting client', MessagesGateway.name);
    for (let i = 0; i < this.webSocketClients.length; i++) {
      if (this.webSocketClients[i] === webSocketClient) {
        this.webSocketClients.splice(i, 1);
        break;
      }
    }
  }
}
