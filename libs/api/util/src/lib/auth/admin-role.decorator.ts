import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { ADMIN } from '@dark-rush-photography/shared/types';

export const AdminRole = (): CustomDecorator<string> =>
  SetMetadata(ADMIN, true);
