import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ADMIN, ENV } from '@dark-rush-photography/shared/types';
import {
  DRP_API_ADMIN_KEY,
  ROLES,
  Env,
  AUTH0_ROLES,
} from '@dark-rush-photography/api/types';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const isAdminUser =
      request.user &&
      AUTH0_ROLES in request.user &&
      request.user[AUTH0_ROLES].includes(ADMIN);

    const isM2M =
      request.headers[DRP_API_ADMIN_KEY] &&
      request.headers[DRP_API_ADMIN_KEY] === this.env.drpApiAdminKey;
    return isAdminUser || isM2M;
  }
}
