import { MediaProcessTable } from '../tables/media-process.table';

export const setMediaProcessReady = (mediaProcess: MediaProcessTable): void => {
  mediaProcess.ready = true;
  mediaProcess.started = false;
  mediaProcess.running = false;
  mediaProcess.completed = false;
};

export const setMediaProcessStarted = (
  mediaProcess: MediaProcessTable
): void => {
  mediaProcess.ready = false;
  mediaProcess.started = true;
  mediaProcess.running = false;
  mediaProcess.completed = false;
};

export const setMediaProcessRunning = (
  mediaProcess: MediaProcessTable
): void => {
  mediaProcess.ready = false;
  mediaProcess.started = false;
  mediaProcess.running = true;
  mediaProcess.completed = false;
};

export const setMediaProcessCompleted = (
  mediaProcess: MediaProcessTable
): void => {
  mediaProcess.ready = false;
  mediaProcess.started = false;
  mediaProcess.running = false;
  mediaProcess.completed = true;
};
