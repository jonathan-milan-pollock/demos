import { HttpService, Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  CommentMessage,
  EmotionMessage,
  Env,
  Message,
  MessageType,
  WebSocketClient,
} from '@dark-rush-photography/web-socket/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';
import { createComment$ } from '../api/comment-api';
import { createOrUpdateEmotion$ } from '../api/emotion-api';

@Injectable()
export class HandleMessageProvider {
  handleMessage$(
    env: Env,
    httpService: HttpService,
    message: CommentMessage | EmotionMessage
  ): Observable<Message> {
    return apiAuth$(env.apiAuth, httpService).pipe(
      switchMap((authToken) => {
        switch (message.messageType) {
          case MessageType.Comment:
            return createComment$(
              env.api,
              httpService,
              authToken,
              message as CommentMessage
            );
          case MessageType.Emotion:
            return createOrUpdateEmotion$(
              env.api,
              httpService,
              authToken,
              message as EmotionMessage
            );
          case MessageType.StartingComment:
          case MessageType.EndingComment:
            return of(message);
          default:
            throw new WsException('Message type is not supported');
        }
      })
    );
  }

  broadcastMessage$(
    webSocketClients: WebSocketClient[],
    message: Message
  ): Observable<void> {
    Logger.log('Broadcasting message', HandleMessageProvider.name);

    return from(webSocketClients).pipe(
      map((webSocketClient) => webSocketClient.send(JSON.stringify(message)))
    );
  }
}
