import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { IS_USER } from '@dark-rush-photography/shared/types';

export const User = (): CustomDecorator<string> => SetMetadata(IS_USER, true);
