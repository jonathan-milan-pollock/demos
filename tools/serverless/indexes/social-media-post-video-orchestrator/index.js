const df = require('durable-functions');

const formatMessage = (message) => {
  return `${'*'.repeat(7)} ${message} ${'*'.repeat(7)}`;
};

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  context.log(formatMessage('Social Media Post Video orchestrator started'));

  let publishedVideo = context.df.getInput();

  context.log(formatMessage('SocialMediaPostVideo - Facebook'));
  publishedVideo = context.df.callActivity(
    'SocialMediaPostVideo',
    publishedVideo
  );
  completedProcesses.push(yield publishedVideo.imageProcessType);

  context.log(formatMessage('SocialMediaPostVideo - Instagram'));
  publishedVideo = context.df.callActivity(
    'SocialMediaPostVideo',
    publishedVideo
  );
  completedProcesses.push(yield publishedVideo.imageProcessType);

  context.log(formatMessage('SocialMediaPostVideo - Instagram'));
  publishedVideo = context.df.callActivity(
    'SocialMediaPostVideo',
    publishedVideo
  );
  completedProcesses.push(yield publishedVideo.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - LinkedIn'));
  publishedVideo = context.df.callActivity(
    'SocialMediaPostVideo',
    publishedVideo
  );
  completedProcesses.push(yield publishedVideo.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - GoogleBusiness'));
  publishedVideo = context.df.callActivity(
    'SocialMediaPostVideo',
    publishedVideo
  );
  completedProcesses.push(yield publishedVideo.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - Twitter'));
  publishedVideo = context.df.callActivity(
    'SocialMediaPostVideo',
    publishedVideo
  );
  completedProcesses.push(yield publishedVideo.imageProcessType);

  context.log(formatMessage('SocialMediaPostImage - YouTube'));
  publishedVideo = context.df.callActivity(
    'SocialMediaPostVideo',
    publishedVideo
  );
  completedProcesses.push(yield publishedVideo.imageProcessType);

  const completedMessage = `Social Media Post Video orchestrator completed 
   ${completedProcesses.join(', ')}`;
  context.log(formatMessage(completedMessage));

  return completedProcesses;
});
