import { OmitType } from '@nestjs/swagger';

import { FavoritesResponseDto } from './favorites-response.dto';

export class FavoritesDto extends OmitType(FavoritesResponseDto, [
  'id',
] as const) {}
