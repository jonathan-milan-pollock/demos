import { Env } from '@dark-rush-photography/api/types';

export const environment: Env = {
  production: true,
  darkRushPhotographyAdminKey: '%%DARK_RUSH_PHOTOGRAPHY_ADMIN_KEY%%',
  auth0Audience: '%%AUTH0_AUDIENCE%%',
  auth0IssuerUrl: '%%AUTH0_ISSUER_URL%%',
  mongoDbConnectionString: '%%MONGO_DB_CONNECTION_STRING%%',
  ayrshareApiKey: '%%AYRSHARE_API_KEY%%',
};
