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
export class UploadVideoProvider {
  validateUpload(
    fileName: string,
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    video: Express.Multer.File
  ): ActivityUpload {
    if (!video) {
      throw new BadRequestException('Video must be provided for video upload');
    }
    return {
      media: {
        fileName,
        entityId,
        entityType,
        entityGroup,
        entitySlug,
      },
      file: video,
    };
  }

  getBlobPath(activityMedia: ActivityMedia): string {
    return getBlobPath(PostState.New, activityMedia);
  }

  getOrchestratorInput(media: ActivityMedia): Activity {
    return {
      type: ActivityType.Upload,
      orchestratorType: ActivityOrchestratorType.UploadVideo,
      postState: PostState.New,
      media,
    };
  }

  logStart(): void {
    Logger.log('Starting upload video orchestrator', UploadVideoProvider.name);
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.UploadVideo} started orchestration with ID = '${instanceId}'.`,
      UploadVideoProvider.name
    );
  }
}
