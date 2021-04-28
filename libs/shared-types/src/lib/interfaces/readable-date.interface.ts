import { Month } from '../enums/month.enum';

export interface ReadableDate {
  readonly month: Month;
  readonly day: number;
  readonly year: number;
}
