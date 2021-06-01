import styles from './image.module.scss';

export interface ImageProps {
  readonly src: string;
  readonly alt: string;
  readonly title: string;
}

function Image(props: ImageProps): JSX.Element {
  return (
    <section className={styles.detail}>
      <img className={styles.image} src={props.src} alt={props.alt} />
      <h1>{props.title}</h1>
    </section>
  );
}

export default Image;
