import styles from './best-of-feature.module.scss';

/* eslint-disable-next-line */
export interface BestOfFeatureProps {}

export function BestOfFeature(props: BestOfFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BestOfFeature!</h1>
    </div>
  );
}

export default BestOfFeature;
