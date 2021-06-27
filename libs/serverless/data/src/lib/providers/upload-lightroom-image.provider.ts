import { Logger, BadRequestException, Injectable } from '@nestjs/common';

import {
  Activity,
  ActivityMedia,
  ActivityOrchestratorType,
  ActivityType,
  ActivityUpload,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  getPublishServiceActivityMedia,
} from '@dark-rush-photography/serverless/util';
import { PostState } from '@dark-rush-photography/shared-types';

@Injectable()
export class UploadLightroomImageProvider {
  validateUpload(fileName: string, image: Express.Multer.File): ActivityUpload {
    if (!image) {
      throw new BadRequestException('Image must be provided for image upload');
    }

    const media = getPublishServiceActivityMedia(fileName);
    if (!media)
      throw new BadRequestException(
        'Activity media was not created from upload'
      );

    return {
      media,
      file: image,
    };
  }

  getBlobPath(activityMedia: ActivityMedia): string {
    return getBlobPath(PostState.New, activityMedia);
  }

  getOrchestratorInput(media: ActivityMedia): Activity {
    return {
      type: ActivityType.Upload,
      orchestratorType: ActivityOrchestratorType.UploadImage,
      postState: PostState.New,
      media,
    };
  }

  logStart(): void {
    Logger.log(
      'Starting upload image orchestrator',
      UploadLightroomImageProvider.name
    );
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.UploadImage} started orchestration with ID = '${instanceId}'.`,
      UploadLightroomImageProvider.name
    );
  }
}
