const df = require('durable-functions');

const formatMessage = (message) => {
  return `${'*'.repeat(7)} ${message} ${'*'.repeat(7)}`;
};

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  context.log(formatMessage('Image Upload orchestrator started'));

  let publishedImage = context.df.getInput();

  // For Best of Image
  context.log(formatMessage('RenameImage'));
  publishedImage = yield context.df.callActivity('RenameImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ExifImage'));
  publishedImage = yield context.df.callActivity('ExifImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Tile'));
  publishedImage.resizeImageDimensionType = 'Tile';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Thumbnail'));
  publishedImage.resizeImageDimensionType = 'Thumbnail';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Small'));
  publishedImage.resizeImageDimensionType = 'Small';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Large'));
  publishedImage.resizeImageDimensionType = 'Large';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Facebook'));
  publishedImage.resizeImageDimensionType = 'Facebook';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Instagram'));
  publishedImage.resizeImageDimensionType = 'Instagram';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage GoogleBusiness'));
  publishedImage.resizeImageDimensionType = 'GoogleBusiness';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage LinkedIn'));
  publishedImage.resizeImageDimensionType = 'LinkedIn';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Twitter'));
  publishedImage.resizeImageDimensionType = 'Twitter';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  // For Each Image
  context.log(formatMessage('RenameImage'));
  publishedImage = yield context.df.callActivity('RenameImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ExifImage'));
  publishedImage = yield context.df.callActivity('ExifImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Tile'));
  publishedImage.resizeImageDimensionType = 'Tile';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Thumbnail'));
  publishedImage.resizeImageDimensionType = 'Thumbnail';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Small'));
  publishedImage.resizeImageDimensionType = 'Small';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Large'));
  publishedImage.resizeImageDimensionType = 'Large';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  context.log(formatMessage('ResizeImage Facebook'));
  publishedImage.resizeImageDimensionType = 'Facebook';
  publishedImage = yield context.df.callActivity('ResizeImage', publishedImage);
  completedProcesses.push(publishedImage.imageProcessType);

  const completedMessage = `Image Upload orchestrator completed 
   ${completedProcesses.join(', ')}`;
  context.log(formatMessage(completedMessage));

  return completedProcesses;
});
