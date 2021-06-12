import { PublishServiceType } from '../enums/publish-service.type';

export interface PublishedImage {
  readonly publishServiceType: PublishServiceType;
  readonly group?: string;
  readonly slug: string;
  readonly imageName: string;
}
