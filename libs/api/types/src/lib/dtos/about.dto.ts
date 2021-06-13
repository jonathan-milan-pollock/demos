import { OmitType } from '@nestjs/swagger';

import { AboutResponseDto } from './about-response.dto';

export class AboutDto extends OmitType(AboutResponseDto, ['id'] as const) {}
