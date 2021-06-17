import { OmitType } from '@nestjs/swagger';

import { EventDto } from './event.dto';

export class EventUpdateDto extends OmitType(EventDto, ['id'] as const) {}
