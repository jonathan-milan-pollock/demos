import { OmitType } from '@nestjs/swagger';

import { ReviewResponseDto } from './review-response.dto';

export class ReviewDto extends OmitType(ReviewResponseDto, ['id'] as const) {}
