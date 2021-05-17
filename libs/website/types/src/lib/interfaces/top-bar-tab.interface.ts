import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface TopBarTab {
  readonly name: string;
  readonly link: string;
  readonly faIcon: IconDefinition;
  readonly ariaLabel: string;
}
