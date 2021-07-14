import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { IS_USER } from '@dark-rush-photography/api/types';

export const User = (): CustomDecorator<string> => SetMetadata(IS_USER, true);
