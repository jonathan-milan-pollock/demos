import { Logger, BadRequestException, Injectable } from '@nestjs/common';

import { EntityType, PostState } from '@dark-rush-photography/shared-types';
import {
  Activity,
  ActivityMedia,
  ActivityOrchestratorType,
  ActivityType,
  ActivityUpload,
} from '@dark-rush-photography/serverless/types';
import { getBlobPath } from '@dark-rush-photography/serverless/util';

@Injectable()
export class UploadThreeSixtyImageProvider {
  validateUpload(
    fileName: string,
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    threeSixtyImage: Express.Multer.File
  ): ActivityUpload {
    if (!threeSixtyImage) {
      throw new BadRequestException(
        'Image must be provided for three sixty image upload'
      );
    }

    return {
      media: {
        fileName,
        entityId,
        entityType,
        entityGroup,
        entitySlug,
      },
      file: threeSixtyImage,
    };
  }

  getBlobPath(activityMedia: ActivityMedia): string {
    return getBlobPath(PostState.New, activityMedia);
  }

  getOrchestratorInput(media: ActivityMedia): Activity {
    return {
      type: ActivityType.Upload,
      orchestratorType: ActivityOrchestratorType.UploadThreeSixtyImage,
      postState: PostState.New,
      media,
    };
  }

  logStart(): void {
    Logger.log(
      'Starting upload three sixty image orchestrator',
      UploadThreeSixtyImageProvider.name
    );
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.UploadThreeSixtyImage} started orchestration with ID = '${instanceId}'.`,
      UploadThreeSixtyImageProvider.name
    );
  }
}
