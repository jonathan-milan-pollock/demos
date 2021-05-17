import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { IS_PUBLIC_KEY } from '@dark-rush-photography/api/types';

export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC_KEY, true);
