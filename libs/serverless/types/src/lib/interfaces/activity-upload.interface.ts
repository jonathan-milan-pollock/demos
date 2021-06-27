import { ActivityMedia } from './activity-media.interface';

export interface ActivityUpload {
  media: ActivityMedia;
  file: Express.Multer.File;
}
