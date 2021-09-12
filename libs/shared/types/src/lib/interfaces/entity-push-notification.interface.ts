import { EntityPushNotificationType } from '../enums/entity-push-notification-type.enum';

export interface EntityPushNotification {
  readonly channelId: string;
  readonly channelToken: string;
  readonly resourceId: string;
  readonly resourceState: EntityPushNotificationType;
}
