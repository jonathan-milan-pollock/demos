export const createEmail = (
  to: string,
  from: string,
  subject: string,
  message: string
): string => {
  const email = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    `to: ${to}\n`,
    `from: ${from}\n`,
    `subject: ${subject}\n\n`,
    message,
  ].join('');

  return Buffer.from(email)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};
