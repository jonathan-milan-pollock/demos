import { OmitType } from '@nestjs/swagger';
import { EmotionDto } from './emotion.dto';

//TODO: Consider more like this?
export class EmotionAddDto extends OmitType(EmotionDto, ['id']) {}
