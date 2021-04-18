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
 * 
 * public static class RecordImageDimensionsActivityFunction
    {
        [FunctionName("RecordImageDimensionActivityFunction")]
        public static async Task<string> RunAsync(
            [ActivityTrigger] string blobPath,
            Binder binder,
            ILogger log)
        {
            log.LogInformation("************** RecordImageDimensionActivityFunction executing ********************");

            log.LogInformation(
                $"************** RecordImageDimensionActivityFunction Blob Path {blobPath} ********************");

            var tempImagePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            await using (var fileStream = File.OpenWrite(tempImagePath))
            {
                var blobAttribute = new BlobAttribute(blobPath, FileAccess.Read)
                    {Connection = "BLOBS_CONNECTION_STRING"};
                await using (var inputBlobStream = await binder.BindAsync<Stream>(blobAttribute))
                {
                    await inputBlobStream.CopyToAsync(fileStream);
                }
            }

            var imageDimension = new ImageDimension();
            using IMagickImage magickImage = new MagickImage(tempImagePath);
            imageDimension.Width = magickImage.Width;
            imageDimension.Height = magickImage.Height;

            // TODO: Save to mongodb

            log.LogInformation(
                $"************** RecordImageDimensionActivityFunction {blobPath} {imageDimension.Width} {imageDimension.Height} ********************");
            log.LogInformation("************** RecordImageDimensionActivityFunction complete ********************");

            return blobPath;
        }
    }
 * 
 */

/**
 * 
 *   [FunctionName("RecordImageDimensionsDurableClient")]
        public static async Task<IActionResult> RunAsync(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)]
            HttpRequest req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            try
            {
                log.LogInformation("************** RecordImageDimensionsDurableClient executing ********************");

                var recordImageDimensionsRequest = new RecordImageDimensionsRequest
                {
                    BlobPathPrefix = "stories/2019/oakland-cemetery-illumine-2019/images"
                };

                var instanceId = await starter.StartNewAsync("RecordImageDimensionsOrchestrationFunction",
                    recordImageDimensionsRequest);
                log.LogInformation("Started orchestration with ID = '{InstanceId}'", instanceId);

                log.LogInformation("************** RecordImageDimensionsDurableClient complete ********************");

                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }


                [FunctionName("RecordImageDimensionsOrchestrationFunction")]
        public static async Task RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context, ILogger log)
        {
            log.LogInformation(
                "************** RecordImageDimensionsOrchestrationFunction executing ********************");

            var recordImageDimensionsRequest = context.GetInput<RecordImageDimensionsRequest>();

            log.LogInformation("************** FindSmallImagesActivityFunction ********************");
            recordImageDimensionsRequest =
                await context.CallActivityAsync<RecordImageDimensionsRequest>("FindSmallImagesActivityFunction",
                    recordImageDimensionsRequest);

            if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
                return;

            log.LogInformation("************** RecordImageDimensionActivityFunction ********************");

            var recordImageDimensionParallelActivities =
                recordImageDimensionsRequest.SmallBlobPaths
                    .Select(smallBlobPath =>
                        context.CallActivityAsync<string>("RecordImageDimensionActivityFunction",
                            smallBlobPath)).ToList();

            await Task.WhenAll(recordImageDimensionParallelActivities);

            log.LogInformation(
                "************** RecordImageDimensionsOrchestrationFunction complete ********************");
        }

 * 
 */
