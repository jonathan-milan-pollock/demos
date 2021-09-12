import { Injectable, Logger } from '@nestjs/common';

import { from, lastValueFrom, map, Observable, of, tap } from 'rxjs';

import { WebSocketClient } from '@dark-rush-photography/shared/types';

@Injectable()
export class WebSocketMessageProvider {
  private readonly logger: Logger;
  private readonly webSocketClients: WebSocketClient[] = [];

  constructor() {
    this.logger = new Logger(WebSocketMessageProvider.name);
  }

  handleConnection(webSocketClient: WebSocketClient): void {
    this.logger.log('connect client');
    this.webSocketClients.push(webSocketClient);
  }

  handleDisconnect(webSocketClient: WebSocketClient): void {
    this.logger.log('disconnect client');
    for (let i = 0; i < this.webSocketClients.length; i++) {
      if (this.webSocketClients[i] === webSocketClient) {
        this.webSocketClients.splice(i, 1);
        break;
      }
    }
  }

  sendMessage(message: string): Promise<void> {
    this.logger.log('sending message');
    const webSocketClients = [...this.webSocketClients];
    if (webSocketClients.length === 0) {
      this.logger.log('no clients found');
      return Promise.resolve(undefined);
    }

    return lastValueFrom(
      from(webSocketClients).pipe(
        tap(() => this.logger.log(message)),
        map((webSocketClient) => webSocketClient.send(message))
      )
    );
  }
}
