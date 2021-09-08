import { GoogleDrivePushNotificationType } from '../enums/google-drive-push-notification-type.enum';

export interface GoogleDrivePushNotification {
  readonly googleChannelId: string;
  readonly googleChannelToken: string;
  readonly googleResourceId: string;
  readonly googleResourceState: GoogleDrivePushNotificationType;
}
