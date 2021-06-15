import { Emotion } from '@dark-rush-photography/shared-types';
import { MessageType } from '../enums/message-type.enum';
import { Message } from './message.interface';

export interface EmotionMessage extends Message, Emotion {
  messageType: MessageType;
}
