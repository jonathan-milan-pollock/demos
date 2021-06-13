import { OmitType } from '@nestjs/swagger';

import { DestinationResponseDto } from './destination-response.dto';

export class DestinationDto extends OmitType(DestinationResponseDto, [
  'id',
] as const) {}
