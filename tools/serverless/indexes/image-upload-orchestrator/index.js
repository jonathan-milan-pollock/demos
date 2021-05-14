const df = require('durable-functions');

const formatMessage = (message) => {
  return `${'*'.repeat(7)} ${message} ${'*'.repeat(7)}`;
};

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  context.log(formatMessage('Image Upload orchestrator started'));

  let publishedImage = context.df.getInput();

  context.log(formatMessage('TinifyImage'));
  publishedImage = yield context.df.callActivity('TinifyImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Tile'));
  publishedImage.resizeImageDimensionType = 'Tile';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Thumbnail'));
  publishedImage.resizeImageDimensionType = 'Thumbnail';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  const completedMessage = `Image Upload orchestrator completed 
   ${completedProcesses.join(', ')}`;
  context.log(formatMessage(completedMessage));

  return completedProcesses;
});
