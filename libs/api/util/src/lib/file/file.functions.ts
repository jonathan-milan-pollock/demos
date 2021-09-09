import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

import { v4 as uuidv4 } from 'uuid';
import { from, mapTo, Observable } from 'rxjs';

export const createTempFile$ = (fileName: string): Observable<string> => {
  const filePath = path.join(os.tmpdir(), uuidv4(), fileName);
  return from(fs.ensureFile(filePath)).pipe(mapTo(filePath));
};

export const writeStreamToFile = (
  readableStream: NodeJS.ReadableStream,
  writeStream: fs.WriteStream
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    readableStream.pipe(writeStream);
    let error: Error | null = null;
    writeStream.on('error', (err) => {
      error = err;
      writeStream.close();
      reject(err);
    });
    writeStream.on('close', () => {
      if (!error) {
        resolve(true);
      }
    });
    writeStream.on('finish', () => {
      if (!error) {
        resolve(true);
      }
    });
  });
};
