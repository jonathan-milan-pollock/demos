import { OmitType } from '@nestjs/swagger';

import { ReviewsResponseDto } from './reviews-response.dto';

export class ReviewsDto extends OmitType(ReviewsResponseDto, ['id'] as const) {}
