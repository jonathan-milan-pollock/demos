import { Module } from '@nestjs/common';

import { UserCommentsModule } from './user-comments/user-comments.module';
import { UserEmotionsModule } from './user-emotions/user-emotions.module';

@Module({
  imports: [
    UserCommentsModule,
    UserEmotionsModule,
  ],
})
export class UserModule {}
