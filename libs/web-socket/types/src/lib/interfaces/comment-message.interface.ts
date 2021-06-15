import { Comment } from '@dark-rush-photography/shared-types';
import { MessageType } from '../enums/message-type.enum';
import { Message } from './message.interface';

export interface CommentMessage extends Message, Comment {
  messageType: MessageType;
}
