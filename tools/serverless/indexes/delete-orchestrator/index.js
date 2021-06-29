const df = require('durable-functions');

module.exports = df.orchestrator(function* (context) {
  const completedProcesses = [];

  const logContext = 'DeleteOrchestrator';

  context.log(`[${logContext}] Delete orchestrator started`);

  let activityProcess = context.df.getInput();
  let firstActivityGroup = activityProcess.activityGroups[0];

  const sequentialActivities = firstActivityGroup.sequential;
  for (const activity of sequentialActivities) {
    const activityResult = yield context.df.callActivity(activity.type, {
      ...activity,
    });
    completedProcesses.push(activityResult.type);
  }

  const tasks = [];
  const parallelActivities = firstActivityGroup.parallel;
  for (const activity of parallelActivities) {
    tasks.push(
      context.df.callActivity(activity.type, {
        ...activity,
      })
    );
  }

  const results = yield context.df.Task.all(tasks);
  const types = results.map((result) => result.type);
  completedProcesses.push(...types);

  context.log(
    `[${logContext}] Delete orchestrator completed ${completedProcesses.join(
      ', '
    )}`
  );
  return completedProcesses;
});
