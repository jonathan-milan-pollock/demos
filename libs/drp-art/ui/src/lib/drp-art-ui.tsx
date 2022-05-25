import styles from './drp-art-ui.module.scss';

/* eslint-disable-next-line */
export interface DrpArtUiProps {}

function DrpArtUi(props: DrpArtUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DrpArtUi!</h1>
    </div>
  );
}

export default DrpArtUi;
