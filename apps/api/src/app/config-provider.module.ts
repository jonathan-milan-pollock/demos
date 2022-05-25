import { Global, Module } from '@nestjs/common';

import { ConfigProvider } from '@dark-rush-photography/api/data';

@Global()
@Module({
  providers: [ConfigProvider],
  exports: [ConfigProvider],
})
export class ConfigProviderModule {}
