import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';

import { from, fromEvent, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const createTempFile = (fileName: string): Observable<string> => {
  const filePath = path.join(os.tmpdir(), uuidv4(), fileName);
  return from(fs.ensureFile(filePath)).pipe(map(() => filePath));
};

const onWriteStreamClose = (writeStream: fs.WriteStream, fileName: string) =>
  fromEvent(writeStream, 'close').pipe(map(() => fileName));
const onWriteStreamError = (writeStream: fs.WriteStream) =>
  fromEvent(writeStream, 'error');

export const writeStreamToFile = (
  readableStream: NodeJS.ReadableStream,
  fileName: string
): Observable<string> => {
  return of(fs.createWriteStream(fileName, { flags: 'w' })).pipe(
    map((writeStream) => readableStream.pipe(writeStream)),
    switchMap((writeStream) => onWriteStreamClose(writeStream, fileName))
  );
};
