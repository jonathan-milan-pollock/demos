import styles from './drp-art-types.module.scss';

/* eslint-disable-next-line */
export interface DrpArtTypesProps {}

function DrpArtTypes(props: DrpArtTypesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DrpArtTypes!</h1>
    </div>
  );
}

export default DrpArtTypes;
