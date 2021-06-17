import { OmitType } from '@nestjs/swagger';

import { PhotoOfTheWeekDto } from './photo-of-the-week.dto';

export class PhotoOfTheWeekUpdateDto extends OmitType(PhotoOfTheWeekDto, [
  'id',
] as const) {}
