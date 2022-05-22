import styles from './website-feature.module.scss';

/* eslint-disable-next-line */
export interface WebsiteFeatureProps {}

export function WebsiteFeature(props: WebsiteFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebsiteFeature!</h1>
    </div>
  );
}

export default WebsiteFeature;
