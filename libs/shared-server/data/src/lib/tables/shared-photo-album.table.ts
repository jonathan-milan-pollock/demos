import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('SharedPhotoAlbumID')
@EntityRowKey('SharedPhotoAlbumKey')
export class SharedPhotoAlbumTable {
  @EntityString() key!: string;
  @EntityString() imageFileId!: string;
  @EntityString() lowResolutionDataUri!: string;
  @EntityString() highResolutionDataUri!: string;
}
