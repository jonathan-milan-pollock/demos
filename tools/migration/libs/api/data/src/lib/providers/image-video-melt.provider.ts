import { Injectable } from '@nestjs/common';

import {
  combineLatest,
  concatMap,
  from,
  last,
  map,
  Observable,
  of,
  toArray,
} from 'rxjs';

import {
  Image,
  ImageDimensionType,
  ImageFilePathEmotion,
  ImageVideo,
  IMAGE_FILE_EXTENSION,
  IMAGE_VIDEO_LOGO_FRAME_PNG,
} from '@dark-rush-photography/shared/types';
import {
  downloadAzureStorageBlobToFile$,
  getAzureStorageBlobPathWithImageDimension,
  getImageFileName,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { ImageVideoMeltProcessProvider } from './image-video-melt-process.provider';

@Injectable()
export class ImageVideoMeltProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageVideoMeltProcessProvider: ImageVideoMeltProcessProvider
  ) {}

  meltImageVideo$(
    imageVideo: ImageVideo,
    emotionImages: Image[]
  ): Observable<void> {
    if (emotionImages.length == 0) return of(undefined);

    return from(emotionImages).pipe(
      concatMap((emotionImage) => {
        const blobPath = getAzureStorageBlobPathWithImageDimension(
          emotionImage.storageId,
          emotionImage.slug,
          IMAGE_FILE_EXTENSION,
          ImageDimensionType.YouTube
        );

        return downloadAzureStorageBlobToFile$(
          blobPath,
          getImageFileName(emotionImage.slug),
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        ).pipe(
          map(
            (filePath) =>
              ({
                filePath: filePath,
                isStarred: emotionImage.isStarred,
                isLoved: emotionImage.isLoved,
              } as ImageFilePathEmotion)
          )
        );
      }),
      toArray<ImageFilePathEmotion>(),
      last(),
      concatMap((imageFilePathEmotions) =>
        combineLatest([
          of(imageFilePathEmotions),
          downloadAzureStorageBlobToFile$(
            IMAGE_VIDEO_LOGO_FRAME_PNG,
            IMAGE_VIDEO_LOGO_FRAME_PNG,
            this.configProvider.azureStorageConnectionStringPublic,
            this.configProvider.azureStorageBlobContainerNamePublic
          ),
        ])
      ),
      concatMap(([imageFilePathEmotions, imageVideoLogoFrameFilePath]) =>
        this.imageVideoMeltProcessProvider.meltProcess$(
          imageVideo,
          imageFilePathEmotions,
          imageVideoLogoFrameFilePath
        )
      )
    );
  }
}
