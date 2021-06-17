import { OmitType } from '@nestjs/swagger';
import { DestinationDto } from './destination.dto';

export class DestinationUpdateDto extends OmitType(DestinationDto, [
  'id',
  'images',
  'imageDimensions',
  'videos',
  'videoDimensions',
  'comments',
  'emotions',
] as const) {}
