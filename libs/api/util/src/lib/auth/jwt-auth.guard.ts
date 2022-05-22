import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Observable } from 'rxjs';

import { IS_PUBLIC, JWT } from '@dark-rush-photography/shared/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC, context.getClass());
    return isPublic ? true : super.canActivate(context);
  }
}
