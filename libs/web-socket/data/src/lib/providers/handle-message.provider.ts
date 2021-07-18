import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { HttpService } from '@nestjs/axios';

import { from, map, Observable, of, switchMap } from 'rxjs';

import {
  CommentMessage,
  EmotionMessage,
  EnvApiAuth,
  Message,
  MessageType,
  WebSocketClient,
} from '@dark-rush-photography/web-socket/types';
import { createComment$ } from '../api/comment-api';
import { createOrUpdateEmotion$ } from '../api/emotion-api';

import { apiAuth$ } from '@dark-rush-photography/web-socket/util';

// TODO: Fix the as word
@Injectable()
export class HandleMessageProvider {
  handleMessage$(
    drpApiUrl: string,
    apiAuth: EnvApiAuth,
    httpService: HttpService,
    message: CommentMessage | EmotionMessage
  ): Observable<Message> {
    return apiAuth$(apiAuth, httpService).pipe(
      switchMap((accessToken) => {
        switch (message.messageType) {
          case MessageType.Comment:
            return createComment$(
              drpApiUrl,
              httpService,
              accessToken,
              message as CommentMessage
            );
          case MessageType.Emotion:
            return createOrUpdateEmotion$(
              drpApiUrl,
              httpService,
              accessToken,
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
