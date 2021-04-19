import { Month } from '../enums/month';

export interface ReadableDate {
  readonly month: Month;
  readonly day: number;
  readonly year: number;
}
