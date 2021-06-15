import { MessageType } from '../enums/message-type.enum';

export interface Message {
  readonly messageType: MessageType;
}
