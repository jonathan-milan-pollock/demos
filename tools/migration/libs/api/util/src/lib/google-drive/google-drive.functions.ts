/* istanbul ignore file */
import { drive_v3, google } from 'googleapis';

export const getGoogleDrive = (
  clientEmail: string,
  privateKey: string
): drive_v3.Drive =>
  google.drive({
    version: 'v3',
    auth: new google.auth.JWT(
      clientEmail,
      undefined,
      privateKey.replace(/\\n/gm, '\n'),
      ['https://www.googleapis.com/auth/drive']
    ),
  });
