import PropTypes from 'prop-types';

import Hyperlink from '../hyperlink/hyperlink.component';

interface Props {
  className?: string;
}

PhoneNumber.propTypes = {
  className: PropTypes.string,
};

export default function PhoneNumber({ className }: Props): JSX.Element {
  return (
    <Hyperlink
      href="tel:404-992-3275"
      text="404.992.3275"
      className={className}
    />
  );
}
