import { Injectable } from '@nestjs/common';
import { Repository } from '@nestjs/azure-database';

import { combineLatest, concatMap, from, map, Observable, of, tap } from 'rxjs';

import { WebSocketClient } from '@dark-rush-photography/web-socket/types';
import { WebSocketMessageTable } from '@dark-rush-photography/shared-server/data';

@Injectable()
export class WebSocketMessageProvider {
  process$(
    webSocketClients: WebSocketClient[],
    webSocketMessageRepository: Repository<WebSocketMessageTable>,
    webSocketMessageTableEntries: WebSocketMessageTable[]
  ): Observable<void> {
    if (webSocketMessageTableEntries.length == 0) return of(undefined);

    return from(webSocketMessageTableEntries).pipe(
      tap((webSocketMessageTableEntry) =>
        console.log(webSocketMessageTableEntry)
      ),
      concatMap((webSocketMessageTableEntry) =>
        combineLatest([
          of(webSocketMessageTableEntry.message),
          from(
            webSocketMessageRepository.delete(
              webSocketMessageTableEntry.key,
              new WebSocketMessageTable()
            )
          ),
        ])
      ),
      concatMap(([message]) => {
        if (webSocketClients.length == 0) {
          return of(undefined);
        }

        return from(webSocketClients).pipe(
          map((webSocketClient) => webSocketClient.send(message))
        );
      })
    );
  }
}
