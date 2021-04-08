/*import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';

const tinify = require('tinify');

import { AzureFunction, Context } from '@azure/functions';

const activityFunction: AzureFunction = async function (
  context: Context
): Promise<string> {
  context.log(
    '************** TinifyImageActivityFunction executing ********************'
  );

  const tempImagePath = path.join(os.tmpdir(), uuidv4());

  tinify.key = process.env['TINY_PNG_API_KEY'];

  // TODO: Download from blob storage

  tinify.fromFile('unoptimized.png').toFile(tempImagePath);

  context.log(
    '************** TinifyImageActivityFunction complete ********************'
  );

  return `Hello ${context.bindings.name}!`;
};

export default activityFunction;
*/
/**
 * public static class TinifyImageActivityFunction
    {

            var blobAttribute = new BlobAttribute(uploadImageRequest.BlobPath, FileAccess.Read)
                {Connection = "IMAGE_UPLOADS_CONNECTION_STRING"};
            await using (var inputBlobStream = await binder.BindAsync<Stream>(blobAttribute))
            {
                var tinyPngApiKey = Environment.GetEnvironmentVariable("TINY_PNG_API_KEY");
                await new TinyPngClient(tinyPngApiKey)
                    .Compress(inputBlobStream)
                    .Download()
                    .SaveImageToDisk(tempImagePath);
            }

            var outputBlobPath = BlobPathExt.ChangeBlobPathPrefix(uploadImageRequest.BlobPath, "image-tinified");
            await using (var outputBlobStream =
                await binder.BindAsync<Stream>(new BlobAttribute(outputBlobPath, FileAccess.Write)))
            {
                await outputBlobStream.WriteAsync(await File.ReadAllBytesAsync(tempImagePath));
            }
            
            return new UploadImageRequest {BlobPath = outputBlobPath};
        }
    }
 * 
 */
