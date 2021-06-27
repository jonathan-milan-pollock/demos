import { Logger, BadRequestException, Injectable } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import {
  Activity,
  ActivityMedia,
  ActivityOrchestratorType,
  ActivityType,
  ActivityUpload,
} from '@dark-rush-photography/serverless/types';
import { getBlobPath } from '@dark-rush-photography/serverless/util';
import { PostState } from '@dark-rush-photography/shared-types';

@Injectable()
export class UploadVideoProvider {
  validateUpload(
    request: AzureRequest,
    video: Express.Multer.File
  ): ActivityUpload {
    if (!video) {
      throw new BadRequestException('Video must be provided for video upload');
    }
    return {
      media: {
        fileName: request.body['fileName'],
        entityId: request.body['entityId'],
        entityType: request.body['entityType'],
        entityGroup: request.body['entityGroup'],
        entitySlug: request.body['entitySlug'],
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
      orchestratorType: ActivityOrchestratorType.UploadImage,
      postState: PostState.New,
      media,
    };
  }

  logStart(): void {
    Logger.log('Starting upload image orchestrator', UploadVideoProvider.name);
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.UploadThreeSixtyImage} started orchestration with ID = '${instanceId}'.`,
      UploadVideoProvider.name
    );
  }
}
