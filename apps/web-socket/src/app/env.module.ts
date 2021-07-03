import { Global, Module } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { environment } from '../environments/environment';

@Global()
@Module({
  providers: [
    {
      provide: ENV,
      useValue: environment,
    },
  ],
  exports: [ENV],
})
export class EnvModule {}
