import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { APP_GUARD, JWT } from '@dark-rush-photography/api/types';
import { JwtAuthGuard, JwtStrategy } from '@dark-rush-photography/api/util';

@Module({
  imports: [PassportModule.register({ defaultStrategy: JWT })],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [PassportModule],
})
export class AuthModule {}
