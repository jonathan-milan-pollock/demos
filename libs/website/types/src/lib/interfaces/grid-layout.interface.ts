import { Layout } from 'react-grid-layout';

export interface GridLayout {
  readonly width: number;
  readonly cols: number;
  readonly layout: Layout[];
}
