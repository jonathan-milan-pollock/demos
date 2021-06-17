import { OmitType } from '@nestjs/swagger';

import { ReviewDto } from './review.dto';

export class ReviewRequestDto extends OmitType(ReviewDto, ['id'] as const) {}
