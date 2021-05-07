import * as fs from 'fs';

export const writeStreamToFile = (
  readableStream: NodeJS.ReadableStream,
  fileName: string
): Promise<void> =>
  new Promise<void>((resolve) => {
    const writeStream = fs.createWriteStream(fileName, { flags: 'w' });
    readableStream.pipe(writeStream);
    writeStream.on('close', function () {
      resolve();
    });
  });
