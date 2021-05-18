export interface Auth0User {
  readonly name?: string;
  readonly given_name?: string;
  readonly family_name?: string;
  readonly middle_name?: string;
  readonly nickname?: string;
  readonly preferred_username?: string;
  readonly profile?: string;
  readonly picture?: string;
  readonly website?: string;
  readonly email?: string;
  readonly email_verified?: boolean;
  readonly gender?: string;
  readonly birthdate?: string;
  readonly zoneinfo?: string;
  readonly locale?: string;
  readonly phone_number?: string;
  readonly phone_number_verified?: boolean;
  readonly address?: string;
  readonly updated_at?: string;
  readonly sub?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [key: string]: any;
}
