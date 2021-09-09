import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { UserModule } from './user/user.module';
import { WebSocketMessagesModule } from './web-socket-messages/web-socket-messages.module';

@Module({
  imports: [AdminModule, PublicModule, UserModule, WebSocketMessagesModule],
})
export class ApiFeatureModule {}
