export interface Location {
  readonly country: string;
  readonly place?: string;
  readonly street?: string;
  readonly city?: string;
  readonly stateOrProvince?: string;
  readonly zipCode?: string;
  readonly longitude?: number;
  readonly latitude?: number;
}
