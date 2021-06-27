const df = require('durable-functions');

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  const logContext = 'UploadImageOrchestrator';

  context.log(`[${logContext}] Upload Image orchestrator started`);

  let activity = context.df.getInput();

  const sequentialTypes = ['AddImage', 'TinifyImage'];
  for (const sequentialType of sequentialTypes) {
    context.log(`[${logContext}] started activity ${sequentialType}`);
    activity = yield context.df.callActivity(sequentialType, { ...activity });
    context.log(`[${logContext}] completed activity ${activity.type}`);
    completedProcesses.push(activity.type);
  }

  const parallelTypes = [
    {
      type: 'ResizeImage',
      config: {
        resizeImageDimensionType: 'Title',
      },
    },
    {
      type: 'ResizeImage',
      config: {
        resizeImageDimensionType: 'Title',
      },
    },
  ];

  const tasks = [];
  const resizeImageDimensionTypes = ['Tile', 'Small'];
  for (const resizeImageDimensionType of resizeImageDimensionTypes) {
    tasks.push(
      context.df.callActivity('ResizeImage', {
        type: 'Tinify',
        media: { ...activity.media },
        config: {
          resizeImageDimensionType,
        },
      })
    );
  }

  const results = yield context.df.Task.all(tasks);
  const types = results.map((result) => {
    context.log('result', result);
    return result.type;
  });
  completedProcesses.push(...types);
  /*const types = results.map((result) => {
    context.log('result', result);
    return result.type;
  });
  completedTasks.push(...types);
*/
  context.log(
    `[${logContext}] Upload Image orchestrator completed ${completedProcesses.join(
      ', '
    )}`
  );
  return completedProcesses;
});
