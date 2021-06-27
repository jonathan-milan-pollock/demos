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
export class UploadImageProvider {
  validateUpload(
    request: AzureRequest,
    image: Express.Multer.File
  ): ActivityUpload {
    if (!image) {
      throw new BadRequestException('Image must be provided for image upload');
    }
    return {
      media: {
        fileName: request.body['fileName'],
        entityId: request.body['entityId'],
        entityType: request.body['entityType'],
        entityGroup: request.body['entityGroup'],
        entitySlug: request.body['entitySlug'],
      },
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
    Logger.log('Starting upload image orchestrator', UploadImageProvider.name);
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.UploadImage} started orchestration with ID = '${instanceId}'.`,
      UploadImageProvider.name
    );
  }
}
