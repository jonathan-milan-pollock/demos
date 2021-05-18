import { Auth0HttpInterceptorConfig } from './auth0-http-interceptor-config.interface';

export interface EnvAuth {
  readonly domain: string;
  readonly clientId: string;
  readonly audience: string;
  readonly httpInterceptor: Auth0HttpInterceptorConfig;
}
