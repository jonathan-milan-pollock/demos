import styles from './email-address.module.scss';
import Hyperlink from '../hyperlink/hyperlink.component';

interface Props {
  className?: string;
}

export default function EmailAddress(props: Props): JSX.Element {
  return (
    <Hyperlink
      href="mailto:dark@darkrush.photo?subject=Dark Rush Photography"
      text="dark@darkrus.photo"
      className={props.className ? styles[props.className] : ''}
    />
  );
}
