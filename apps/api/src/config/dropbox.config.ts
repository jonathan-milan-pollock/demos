export const GET_WEBSITES_DROPBOX_REDIRECT_URI = (
  protocol: string,
  host?: string
): string => {
  return `${protocol}://${host}/api/v1/dropbox/websites-redirect`;
};

export const GET_CLIENTS_DROPBOX_REDIRECT_URI = (
  protocol: string,
  host?: string
): string => {
  return `${protocol}://${host}/api/v1/dropbox/clients-redirect`;
};
