const df = require('durable-functions');

const formatMessage = (message) => {
  return `${'*'.repeat(7)} ${message} ${'*'.repeat(7)}`;
};

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  context.log(formatMessage('Image Post orchestrator started'));

  let publishedImage = context.df.getInput();

  context.log(formatMessage('RenameImage'));
  publishedImage = context.df.callActivity('RenameImage', publishedImage);
  completedProcesses.push(yield publishedImage.imageDimensionState);

  context.log(formatMessage('ResizeImageTile'));
  publishedImage = yield context.df.callActivity(
    'ResizeImageTile',
    publishedImage
  );
  completedProcesses.push(publishedImage.imageDimensionState);

  context.log(formatMessage('ResizeImageThumbnail'));
  publishedImage = yield context.df.callActivity(
    'ResizeImageThumbnail',
    publishedImage
  );
  completedProcesses.push(publishedImage.imageDimensionState);

  context.log(formatMessage('RevealImage'));
  publishedImage = yield context.df.callActivity('RevealImage', publishedImage);
  completedProcesses.push(publishedImage.imageDimensionState);

  const completedMessage = `Image Post orchestrator completed 
   ${completedProcesses.join(', ')}`;
  context.log(formatMessage(completedMessage));

  return completedProcesses;
});
