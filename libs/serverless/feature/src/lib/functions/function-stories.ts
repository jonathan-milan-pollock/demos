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
 *     [FunctionName("StoriesFunction")]
        public static async Task<IActionResult> RunAsync(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)]
            HttpRequest req, ILogger log)
        {
            try
            {
                log.LogInformation("************** StoriesFunction executing ********************");

                // Connect to mongodb for stories documents

                log.LogInformation("************** StoriesFunction complete ********************");

                return new OkObjectResult(null);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
 * 
 */
