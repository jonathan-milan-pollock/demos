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

  //context.log(('ResizeImage Tile'));
  //const tileActivity = {
  //  state: 'tinified',
  //  publishedImage: { ...activity.publishedImage },
  //  config: {
  //   resizeImageDimensionType: 'Tile',
  //  },
  //};
  // activity = yield context.df.callActivity('ResizeImage', tileActivity);
  // completedProcesses.push(activity.state);

  // context.log(('ResizeImage Small'));
  // const smallActivity = {
  //   state: 'tinified',
  //   publishedImage: { ...activity.publishedImage },
  //   config: {
  //     resizeImageDimensionType: 'Small',
  //   },
  // };
  // activity = yield context.df.callActivity('ResizeImage', smallActivity);
  // completedProcesses.push(activity.state);

  context.log(
    `[${logContext}] Upload Image orchestrator completed ${completedProcesses.join(
      ', '
    )}`
  );
  return completedProcesses;
});
