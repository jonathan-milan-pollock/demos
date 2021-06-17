import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { ROLES } from '@dark-rush-photography/api/types';

export const Roles = (...roles: string[]): CustomDecorator<string> =>
  SetMetadata(ROLES, roles);
