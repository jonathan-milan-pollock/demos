import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { ADMIN } from '@dark-rush-photography/shared/types';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.user['https://www.darkrushphotography.com/roles'].includes(
      ADMIN
    );
  }
}
