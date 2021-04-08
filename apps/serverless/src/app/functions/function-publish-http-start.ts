/*import * as df from 'durable-functions';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { DurableOrchestrationClient } from 'durable-functions/lib/src/durableorchestrationclient';

import { loadMultipartImage } from '../shared/services/load-multipart-image-service';
import { uploadImageBlob } from '../shared/services/upload-image-blob-service';
import { Image } from '../shared/interfaces/image';

const startNewImageOrchestrator = (
  orchestratorName: string,
  client: DurableOrchestrationClient,
  image: Image
): Promise<string> =>
  client.startNew('FunctionUploadImageOrchestrator', undefined, image);

const httpStart: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  if (req.method == 'GET') {
    context.res = {
      status: 400,
      body: { message: 'POST is required for uploading images' },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    context.done();
    return;
  }

  const client = df.getClient(context);
  return uploadImageBlob(loadMultipartImage(req))
    .then((image) =>
      startNewImageOrchestrator(
        'FunctionUploadImageOrchestrator',
        client,
        image
      )
    )
    .then((instanceId) => {
      context.log(`Started orchestration with ID = '${instanceId}'.`);
      return instanceId;
    })
    .then((instanceId) => {
      return client.createCheckStatusResponse(
        context.bindingData.req,
        instanceId
      );
    });
};

export default httpStart;
*/
