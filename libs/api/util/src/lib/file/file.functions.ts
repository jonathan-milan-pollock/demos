import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

import { v4 as uuidv4 } from 'uuid';
import {
  from,
  fromEvent,
  map,
  mapTo,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';

export const createTempFile$ = (fileName: string): Observable<string> => {
  const filePath = path.join(os.tmpdir(), uuidv4(), fileName);
  return from(fs.ensureFile(filePath)).pipe(mapTo(filePath));
};

export const writeStreamToFile$ = (
  readableStream: NodeJS.ReadableStream,
  fileName: string
): Observable<string> => {
  return of(fs.createWriteStream(fileName, { flags: 'w' })).pipe(
    map((writeStream) => readableStream.pipe(writeStream)),
    switchMap((writeStream) => fromEvent(writeStream, 'close')),
    mapTo(fileName),
    take(1)
  );
};
