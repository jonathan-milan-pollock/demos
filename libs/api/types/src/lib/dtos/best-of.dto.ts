import { OmitType } from '@nestjs/swagger';

import { BestOfResponseDto } from './best-of-response.dto';

export class BestOfDto extends OmitType(BestOfResponseDto, ['id'] as const) {}
