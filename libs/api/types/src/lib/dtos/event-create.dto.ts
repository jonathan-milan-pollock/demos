import { IsInt, IsString, Min } from 'class-validator';

export class EventCreateDto {
  @IsInt()
  @Min(0)
  group!: number;

  @IsString()
  slug!: string;
}
