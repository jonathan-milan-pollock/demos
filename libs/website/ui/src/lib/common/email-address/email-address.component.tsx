import PropTypes from 'prop-types';

import styles from './email-address.module.scss';
import Hyperlink from '../hyperlink/hyperlink.component';

interface Props {
  className?: string;
}

EmailAddress.propTypes = {
  className: PropTypes.string,
};

export default function EmailAddress({ className }: Props): JSX.Element {
  return (
    <Hyperlink
      href="mailto:dark@darkrush.photo?subject=Dark Rush Photography"
      text="dark@darkrus.photo"
      className={className ? styles[className] : ''}
    />
  );
}
