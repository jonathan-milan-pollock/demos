import { IsNumberString, IsString } from 'class-validator';

export class EventCreateDto {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;
}
