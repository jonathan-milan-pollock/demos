import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';

export const createTempFile = async (fileName: string): Promise<string> => {
  const tempFilePath = path.join(os.tmpdir(), uuidv4(), fileName);
  await fs.ensureFile(tempFilePath);
  return tempFilePath;
};
