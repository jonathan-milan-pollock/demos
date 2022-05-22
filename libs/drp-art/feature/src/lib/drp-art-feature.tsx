import styles from './drp-art-feature.module.scss';

/* eslint-disable-next-line */
export interface DrpArtFeatureProps {}

export function DrpArtFeature(props: DrpArtFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DrpArtFeature!</h1>
    </div>
  );
}

export default DrpArtFeature;
