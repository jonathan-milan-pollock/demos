import PropTypes from 'prop-types';

import styles from './hyperlink.module.scss';

interface Props {
  href: string;
  text: string;
  className?: string;
}

Hyperlink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default function Hyperlink({
  href,
  text,
  className,
}: Props): JSX.Element {
  let hyperlinkClassName = styles['hyperlink'];
  if (className) {
    hyperlinkClassName = `${styles['hyperlink']} ${className}`;
  }
  return (
    <a href={href} className={hyperlinkClassName} data-testid="hyperlink">
      {text}
    </a>
  );
}
