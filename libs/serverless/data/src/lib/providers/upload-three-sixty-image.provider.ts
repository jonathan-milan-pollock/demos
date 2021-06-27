import { Logger, BadRequestException, Injectable } from '@nestjs/common';
import { AzureRequest } from '@nestjs/azure-func-http';

import { PostState } from '@dark-rush-photography/shared-types';
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
    request: AzureRequest,
    threeSixtyImage: Express.Multer.File
  ): ActivityUpload {
    if (!threeSixtyImage) {
      throw new BadRequestException(
        'Image must be provided for three sixty image upload'
      );
    }

    return {
      media: {
        fileName: request.body['fileName'],
        entityId: request.body['entityId'],
        entityType: request.body['entityType'],
        entityGroup: request.body['entityGroup'],
        entitySlug: request.body['entitySlug'],
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
