import { GeoCoordinates } from './geo-coordinates.interface';

export interface Location {
  readonly place?: string;
  readonly street?: string;
  readonly city?: string;
  readonly stateOrProvince?: string;
  readonly zipCode?: string;
  readonly country: string;
  readonly geo?: GeoCoordinates;
}
