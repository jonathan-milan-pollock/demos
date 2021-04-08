/*
 import * as df from 'durable-functions';

import { Image } from '../shared/interfaces/image';
import { ImageFactoryService } from '../shared/services/image-factory-service';

const orchestrator = df.orchestrator(function* (context) {
  const imageInput = context.df.getInput() as Image;

  const image = ImageFactoryService.hydrateFromBlobPath(imageInput.blobPath);

  context.log(
    `************** Orchestrating image upload ${image.blobName} ********************`
  );

  context.log('************** TinifyImage ********************');
  const imageOutput = yield context.df.callActivity(
    'FunctionTinifyImage',
    image
  );



  context.log('************** ExifImage ********************');
  image = yield context.df.callActivity('ExifImageActivityFunction', image);

  context.log('************** ResizeImage ********************');
  image = yield context.df.callActivity('ResizeImageActivityFunction', image);

  context.log('************** RenameImages ********************');
  image = yield context.df.callActivity('RenameImageActivityFunction', image);

  context.log(
    '************** UploadImageOrchestrationFunction complete ********************'
  );
  return image;
});

export default orchestrator;
*/
