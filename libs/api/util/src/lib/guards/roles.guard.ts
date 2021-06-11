import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const isAdminUser =
      request.user &&
      'https://www.darkrushphotography.com//roles' in request.user &&
      request.user['https://www.darkrushphotography.com//roles'].includes(
        'Admin'
      );
    const isM2M =
      request.headers['DRP_ADMIN_KEY'] &&
      request.headers['DRP_ADMIN_KEY'] === this.env.darkRushPhotographyAdminKey;
    return isAdminUser || isM2M;
  }
}
