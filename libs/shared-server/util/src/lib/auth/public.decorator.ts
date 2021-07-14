import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { IS_PUBLIC } from '@dark-rush-photography/shared-server/types';

export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC, true);
