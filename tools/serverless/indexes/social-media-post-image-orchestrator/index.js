const df = require('durable-functions');

const formatMessage = (message) => {
  return `${'*'.repeat(7)} ${message} ${'*'.repeat(7)}`;
};

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  context.log(formatMessage('Social Media Post Image orchestrator started'));

  let publishedImage = context.df.getInput();

  context.log(formatMessage('SocialMediaPostImage - Facebook'));
  publishedImage = context.df.callActivity(
    'SocialMediaPostImage',
    publishedImage
  );
  completedProcesses.push(yield publishedImage.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - Instagram'));
  publishedImage = context.df.callActivity(
    'SocialMediaPostImage',
    publishedImage
  );
  completedProcesses.push(yield publishedImage.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - Instagram'));
  publishedImage = context.df.callActivity(
    'SocialMediaPostImage',
    publishedImage
  );
  completedProcesses.push(yield publishedImage.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - LinkedIn'));
  publishedImage = context.df.callActivity(
    'SocialMediaPostImage',
    publishedImage
  );
  completedProcesses.push(yield publishedImage.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - GoogleBusiness'));
  publishedImage = context.df.callActivity(
    'SocialMediaPostImage',
    publishedImage
  );
  completedProcesses.push(yield publishedImage.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - Twitter'));
  publishedImage = context.df.callActivity(
    'SocialMediaPostImage',
    publishedImage
  );
  completedProcesses.push(yield publishedImage.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - YouTube'));
  publishedImage = context.df.callActivity(
    'SocialMediaPostImage',
    publishedImage
  );
  completedProcesses.push(yield publishedImage.imageProcessType);

  const completedMessage = `Social Media Post Image orchestrator completed 
   ${completedProcesses.join(', ')}`;
  context.log(formatMessage(completedMessage));

  return completedProcesses;
});
