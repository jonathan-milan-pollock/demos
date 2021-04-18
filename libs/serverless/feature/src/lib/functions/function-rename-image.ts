/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

/*
import { AzureFunction, Context } from '@azure/functions';

const activityFunction: AzureFunction = async function (
  context: Context
): Promise<string> {
  return `Hello ${context.bindings.name}!`;
};

export default activityFunction;
*/
/**
 *  public static class RenameImageActivityFunction
    {
        [FunctionName("RenameImageActivityFunction")]
        public static async Task<UploadImageRequest> RunAsync(
            [ActivityTrigger] UploadImageRequest uploadImageRequest,
            Binder binder,
            ILogger log)
        {
            log.LogInformation("************** RenameImageActivityFunction executing ********************");

            var tempImagePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            await using (var fileStream = File.OpenWrite(tempImagePath))
            {
                await using (var inputBlobStream =
                    await binder.BindAsync<Stream>(new BlobAttribute(uploadImageRequest.BlobPath, FileAccess.Read)))
                {
                    await inputBlobStream.CopyToAsync(fileStream);
                }
            }

            log.LogInformation($"************** FindFinalName {uploadImageRequest.BlobPath} ********************");

            var finalBlobPathName = BlobPathExt.FindFinalName(uploadImageRequest.BlobPath);
            var blobAttribute = new BlobAttribute(finalBlobPathName, FileAccess.Write)
                {Connection = "BLOBS_CONNECTION_STRING"};
            await using (var outputBlobStream = await binder.BindAsync<Stream>(blobAttribute))
            {
                await outputBlobStream.WriteAsync(await File.ReadAllBytesAsync(tempImagePath));
            }

            log.LogInformation("************** RenameImageActivityFunction complete ********************");

            return new UploadImageRequest {BlobPath = finalBlobPathName};
        }
    }
 * 
 * 
 */
