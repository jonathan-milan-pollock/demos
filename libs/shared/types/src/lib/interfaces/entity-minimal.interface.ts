import { EntityType } from '../enums/entity-type.enum';
import { WatermarkedType } from '../enums/watermarked-type.enum';

export interface EntityMinimal {
  readonly type: EntityType;
  readonly id: string;
  readonly watermarkedType: WatermarkedType;
  readonly group: string;
  readonly slug: string;
}
