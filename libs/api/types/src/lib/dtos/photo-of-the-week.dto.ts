import { OmitType } from '@nestjs/swagger';

import { PhotoOfTheWeekResponseDto } from './photo-of-the-week-response.dto';

export class PhotoOfTheWeekDto extends OmitType(PhotoOfTheWeekResponseDto, [
  'id',
] as const) {}
