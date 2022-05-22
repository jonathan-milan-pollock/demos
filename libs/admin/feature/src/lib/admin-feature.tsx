import styles from './admin-feature.module.scss';

/* eslint-disable-next-line */
export interface AdminFeatureProps {}

export function AdminFeature(props: AdminFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminFeature!</h1>
    </div>
  );
}

export default AdminFeature;
