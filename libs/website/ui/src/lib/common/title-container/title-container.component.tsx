import styles from './title-container.module.scss';

interface Props {
  title: string;
}

export default function TitleContainer({ title }: Props): JSX.Element {
  return (
    <div className={styles['container']}>
      <p className={styles['title']}>{title}</p>
    </div>
  );
}
