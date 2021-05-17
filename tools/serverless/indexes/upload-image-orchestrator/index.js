const df = require('durable-functions');

const formatMessage = (message) => {
  return `${'*'.repeat(7)} ${message} ${'*'.repeat(7)}`;
};

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  context.log(formatMessage('Upload Image orchestrator started'));

  let activity = context.df.getInput();

  context.log(formatMessage('TinifyImage'));
  activity = yield context.df.callActivity('TinifyImage', { ...activity });
  completedProcesses.push(activity.type);

  context.log(formatMessage('ResizeImage Tile'));
  const tileActivity = {
    type: 'tinified-image',
    publishedImage: { ...activity.publishedImage },
    data: {
      resizeImageDimensionType: 'Tile',
    },
  };
  activity = yield context.df.callActivity('ResizeImage', tileActivity);
  completedProcesses.push(activity.type);

  context.log(formatMessage('ResizeImage Small'));
  activity.type = 'tinified-image';
  activity.data = {
    resizeImageDimensionType: 'Small',
  };
  activity = yield context.df.callActivity('ResizeImage', { ...activity });
  completedProcesses.push(activity.type);

  const completedMessage = `Upload Image orchestrator completed 
   ${completedProcesses.join(', ')}`;
  context.log(formatMessage(completedMessage));

  return completedProcesses;
});
