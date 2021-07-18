import { IsString } from 'class-validator';

export class DestinationCreateDto {
  @IsString()
  slug!: string;
}
