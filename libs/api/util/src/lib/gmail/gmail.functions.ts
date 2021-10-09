/* istanbul ignore file */
import { gmail_v1, google } from 'googleapis';

export const getGmail = (
  clientEmail: string,
  privateKey: string
): gmail_v1.Gmail => {
  const auth = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey.replace(/\\n/gm, '\n'),
    [
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.send',
    ]
  );
  return google.gmail({ version: 'v1', auth });
};
