import { Scrollbar } from 'react-scrollbars-custom';

import styles from './color-scrollbar.module.scss';

export default function ColorScrollbar(props: JSX.Element): JSX.Element {
  return <Scrollbar {...props} data-testid="color-scrollbar" />;
}
