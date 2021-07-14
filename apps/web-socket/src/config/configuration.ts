import { Env } from '@dark-rush-photography/web-socket/types';
import { WsException } from '@nestjs/websockets';
import { environment } from '../environments/environment';

export default (): Env => {
  if (!process.env.NX_AUTH0_CLIENT_ID) {
    throw new WsException(
      'Please add NX_AUTH0_CLIENT_ID to environment variables'
    );
  }

  if (!process.env.NX_AUTH0_CLIENT_SECRET) {
    throw new WsException(
      'Please add NX_AUTH0_CLIENT_SECRET to environment variables'
    );
  }

  return {
    production: environment.production,
    drpApiUrl: environment.drpApiUrl,
    apiAuth: {
      auth0ClientId: process.env.NX_AUTH0_CLIENT_ID,
      auth0ClientSecret: process.env.NX_AUTH0_CLIENT_SECRET,
    },
  };
};
