import PropTypes from 'prop-types';

import styles from './text-container.module.scss';

interface Props {
  title?: string;
  className?: string;
  titleClassName?: string;
  renderItem: JSX.Element;
}

TextContainer.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  renderItem: PropTypes.object.isRequired,
};

export default function TextContainer({
  title,
  className,
  titleClassName,
  renderItem,
}: Props): JSX.Element {
  let textClasses = styles['container'];
  if (className) {
    textClasses = `${styles['container']} ${styles[className]}`;
  }

  let titleClasses = styles['title'];
  if (titleClassName) {
    titleClasses = `${styles['title']} ${styles[titleClassName]}`;
  }

  const renderTitle = (title?: string) => {
    if (!title) return null;

    return <p className={titleClasses}>{title}</p>;
  };

  return (
    <div className={textClasses}>
      {renderTitle(title)}
      {renderItem}
    </div>
  );
}
