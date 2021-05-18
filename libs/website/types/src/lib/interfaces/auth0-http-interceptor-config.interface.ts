import { HttpMethod } from '@auth0/auth0-angular';

export interface Auth0HttpInterceptorConfig {
  readonly allowedList: (
    | string
    | { uri: string; allowAnonymous: boolean }
    | { uri: string; allowAnonymous: boolean; httpMethod: HttpMethod }
  )[];
}
