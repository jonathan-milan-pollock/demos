const df = require('durable-functions');

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  const logContext = 'SyncImagesOrchestrator';

  context.log(`[${logContext}] started`);

  const syncImages = context.df.getInput();

  const tasks = [];
  for (const syncImage of syncImages) {
    tasks.push(context.df.callActivity('ProcessSyncImage', { ...syncImage }));
  }

  const results = yield context.df.Task.all(tasks);
  const syncImageFileNames = results.map(
    (syncImageResult) => syncImageResult.media.fileName
  );
  completedProcesses.push(...syncImageFileNames);
  context.log(`[${logContext}] completed ${completedProcesses.join(', ')}`);
  return completedProcesses;
});
