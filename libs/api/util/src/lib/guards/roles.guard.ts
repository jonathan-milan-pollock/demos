import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ENV } from '@dark-rush-photography/shared-types';
import { AUTH0_ROLES } from '@dark-rush-photography/shared-server/types';
import { DRP_ADMIN_KEY, ROLES, Env } from '@dark-rush-photography/api/types';

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
      request.user[AUTH0_ROLES].includes('Admin');

    const isM2M =
      request.headers[DRP_ADMIN_KEY] &&
      request.headers[DRP_ADMIN_KEY] === this.env.drpAdminKey;
    return isAdminUser || isM2M;
  }
}
