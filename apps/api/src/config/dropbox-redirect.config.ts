export const GET_DROPBOX_REDIRECT_URI = (
  protocol: string,
  host?: string
): string => {
  return `${protocol}://${host}/api/v1/dropbox/redirect`;
};
