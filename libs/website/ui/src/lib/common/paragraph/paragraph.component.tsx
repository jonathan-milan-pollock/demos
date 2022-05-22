import PropTypes from 'prop-types';
import styles from './page-container.module.scss';

interface Props {
  text: string;
  className?: string;
}

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default function Paragraph({ text, className }: Props): JSX.Element {
  let paragraphClassName = styles['paragraph'];
  if (className) {
    paragraphClassName = `${styles['paragraph']} ${className}`;
  }
  return <p className={paragraphClassName}>{text}</p>;
}
