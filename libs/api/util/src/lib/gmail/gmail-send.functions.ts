import { from, map, Observable } from 'rxjs';
import { gmail_v1 } from 'googleapis';

import { createEmail } from './gmail-email-create.functions';

export const sendGmailEmail = (
  gmail: gmail_v1.Gmail,
  senderEmail: string,
  recipientEmail: string,
  subject: string,
  message: string
): Observable<void> => {
  return from(
    gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: createEmail(senderEmail, recipientEmail, subject, message),
      },
    })
  ).pipe(map(() => undefined));
};
