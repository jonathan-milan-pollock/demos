import { Injectable } from '@nestjs/common';

import { from, last, map, Observable, of } from 'rxjs';

import { WebSocketClient } from '@dark-rush-photography/shared/types';

@Injectable()
export class WebSocketMessageProvider {
  private webSocketClients: WebSocketClient[] = [];

  handleConnection(webSocketClient: WebSocketClient): void {
    this.webSocketClients = [...this.webSocketClients, webSocketClient];
  }

  handleDisconnect(webSocketClient: WebSocketClient): void {
    this.webSocketClients = this.webSocketClients.filter(
      (client) => client != webSocketClient
    );
  }

  sendMessage$(message: string): Observable<void> {
    const webSocketClients = [...this.webSocketClients];
    if (webSocketClients.length === 0) {
      return of(undefined);
    }

    return from(webSocketClients).pipe(
      map((webSocketClient) => webSocketClient.send(message)),
      last()
    );
  }
}
