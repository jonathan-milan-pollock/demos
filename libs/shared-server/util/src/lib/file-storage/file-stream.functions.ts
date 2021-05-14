import * as fs from 'fs-extra';

export const writeStreamToFile = (fileName: string) => (
  readableStream: NodeJS.ReadableStream
): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const writeStream = fs.createWriteStream(fileName, { flags: 'w' });
    readableStream.pipe(writeStream);
    writeStream.on('close', () => {
      resolve(fileName);
    });
    writeStream.on('error', (error) => {
      console.error(error);
      reject(error);
    });
  });
