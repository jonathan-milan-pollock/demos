import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdminModule, PublicModule, UserModule],
})
export class ApiFeatureModule {}
