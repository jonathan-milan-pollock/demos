import { WatermarkedType } from '../enums/watermarked-type.enum';

export interface Group {
  readonly watermarkedType: WatermarkedType;
  readonly name: string;
}
