import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AUTH0_ROLES, IS_USER, ADMIN } from '@dark-rush-photography/api/types';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isUser = this.reflector.getAllAndOverride<boolean>(IS_USER, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isUser) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    return (
      request.user &&
      AUTH0_ROLES in request.user &&
      request.user.AUTH0_ROLES.includes(ADMIN)
    );
  }
}
