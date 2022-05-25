import styles from './text-container.module.scss';

interface Props {
  title?: string;
  className?: string;
  titleClassName?: string;
  children?: React.ReactNode;
}

export default function TextContainer(props: Props): JSX.Element {
  let textClasses = styles['container'];
  if (props.className) {
    textClasses = `${styles['container']} ${styles[props.className]}`;
  }

  let titleClasses = styles['title'];
  if (props.titleClassName) {
    titleClasses = `${styles['title']} ${styles[props.titleClassName]}`;
  }

  const renderTitle = (title?: string) => {
    if (!title) return null;

    return <p className={titleClasses}>{title}</p>;
  };

  return (
    <div className={textClasses}>
      {renderTitle(props.title)}
      {props.children}
    </div>
  );
}
