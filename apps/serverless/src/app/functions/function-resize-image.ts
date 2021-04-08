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
 * public static class ResizeImageActivityFunction
    {
        [FunctionName("ResizeImageActivityFunction")]
        public static async Task<UploadImageRequest> RunAsync(
            [ActivityTrigger] UploadImageRequest uploadImageRequest,
            Binder binder,
            ILogger log)
        {
            log.LogInformation("************** ResizeImageActivityFunction executing ********************");

            var tempImagePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            await using (var fileStream = File.OpenWrite(tempImagePath))
            {
                await using (var inputBlobStream =
                    await binder.BindAsync<Stream>(new BlobAttribute(uploadImageRequest.BlobPath, FileAccess.Read)))
                {
                    await inputBlobStream.CopyToAsync(fileStream);
                }
            }

            using IMagickImage magickImage = new MagickImage(tempImagePath);

            var imageDimension = uploadImageRequest.ImageDimension;
            var width = imageDimension.Width;
            var height = imageDimension.Height;
            var longestEdge = imageDimension.LongestEdge;
            var resizeToExactDimensions = imageDimension.ResizeToExactDimensions;
            if (longestEdge > 0)
            {
                if (magickImage.Width > magickImage.Height)
                    magickImage.Resize(longestEdge, 0);
                else
                    magickImage.Resize(0, longestEdge);
            }
            else if (resizeToExactDimensions)
            {
                var backgroundColor = Environment.GetEnvironmentVariable("RESIZE_IMAGE_EXACT_BACKGROUND_COLOR");

                magickImage.AdaptiveResize(width, height);
                magickImage.Page.Width = width;
                magickImage.Page.Height = height;
                ((MagickImage) magickImage).BackgroundColor = new MagickColor(backgroundColor);
                magickImage.Extent(width, height, Gravity.Center);
            }
            else
            {
                magickImage.Resize(width, height);
            }

            magickImage.Write(tempImagePath);


            var outputBlobPath = BlobPathExt.ChangeBlobPathPrefix(uploadImageRequest.BlobPath, "image-resized");
            outputBlobPath = BlobPathExt.AddImageType(outputBlobPath, imageDimension.ImageType);

            await using (var outputBlobStream =
                await binder.BindAsync<Stream>(new BlobAttribute(outputBlobPath, FileAccess.Write)))
            {
                await outputBlobStream.WriteAsync(await File.ReadAllBytesAsync(tempImagePath));
            }

            log.LogInformation("************** ResizeImageActivityFunction complete ********************");

            return new UploadImageRequest {BlobPath = outputBlobPath};
        }
    }
 * 
 * 
 */
