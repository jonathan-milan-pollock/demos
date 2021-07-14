import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { HttpService } from '@nestjs/axios';

import { switchMap, take } from 'rxjs/operators';

import {
  Env,
  EnvApiAuth,
  WebSocketClient,
} from '@dark-rush-photography/web-socket/types';
import { HandleMessageProvider } from '@dark-rush-photography/web-socket/data';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  readonly webSocketClients: WebSocketClient[] = [];

  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly httpService: HttpService,
    private readonly handleMessageProvider: HandleMessageProvider
  ) {}

  @SubscribeMessage('messageToServer')
  async handleMessage(@MessageBody() message: string): Promise<void> {
    const drpApiUrl = this.configService.get<string>('drpApiUrl', {
      infer: true,
    });
    if (!drpApiUrl) {
      throw new WsException('Api Url has not been configured');
    }

    return await this.handleMessageProvider
      .handleMessage$(
        drpApiUrl,
        this.configService.get<EnvApiAuth>('apiAuth', { infer: true }),
        this.httpService,
        JSON.parse(message)
      )
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

    // create observable to push here
  }

  handleDisconnect(webSocketClient: WebSocketClient): void {
    Logger.log('disconnecting client', MessagesGateway.name);
    for (let i = 0; i < this.webSocketClients.length; i++) {
      if (this.webSocketClients[i] == webSocketClient) {
        this.webSocketClients.splice(i, 1);
        break;
      }
    }
  }
}
