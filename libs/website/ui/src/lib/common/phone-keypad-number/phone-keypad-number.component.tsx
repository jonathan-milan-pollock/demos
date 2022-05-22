import PropTypes from 'prop-types';

import Hyperlink from '../hyperlink/hyperlink.component';

interface Props {
  className?: string;
}

PhoneKeypadNumber.propTypes = {
  className: PropTypes.string,
};

export default function PhoneKeypadNumber({ className }: Props): JSX.Element {
  return (
    <Hyperlink
      href="tel:404-992-3275"
      text="404.992.DARK"
      className={className}
    />
  );
}
