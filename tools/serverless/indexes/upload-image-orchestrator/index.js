const df = require('durable-functions');

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  const logContext = 'UploadImageOrchestrator';

  context.log(`[${logContext}] Upload Image orchestrator started`);

  let activity = context.df.getInput();

  context.log(`[${logContext}] AddImage`);
  activity = yield context.df.callActivity('AddImage', { ...activity });
  completedProcesses.push(activity.state);

  context.log(`[${logContext}] TinifyImage`);
  activity = yield context.df.callActivity('TinifyImage', { ...activity });
  completedProcesses.push(activity.state);

  const tasks = [];
  const resizeImageDimensionTypes = ['Tile', 'Small'];
  for (const resizeImageDimensionType of resizeImageDimensionTypes) {
    tasks.push(
      context.df.callActivity('ResizeImage', {
        state: 'tinified',
        publishedImage: { ...activity.publishedImage },
        config: {
          resizeImageDimensionType,
        },
      })
    );
  }

  const results = yield context.df.Task.all(tasks);
  const states = results.map((result) => result.state);
  completedProcesses.push(...states);

  context.log(
    `[${logContext}] Upload Image orchestrator completed ${completedProcesses.join(
      ', '
    )}`
  );
  return completedProcesses;
});
