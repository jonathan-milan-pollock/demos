import styles from './drp-art-data.module.scss';

/* eslint-disable-next-line */
export interface DrpArtDataProps {}

export function DrpArtData(props: DrpArtDataProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DrpArtData!</h1>
    </div>
  );
}

export default DrpArtData;
