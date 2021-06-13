import { OmitType } from '@nestjs/swagger';

import { EventResponseDto } from './event-response.dto';

export class EventDto extends OmitType(EventResponseDto, ['id'] as const) {}
