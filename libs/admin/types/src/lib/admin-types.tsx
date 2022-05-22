import styles from './admin-types.module.scss';

/* eslint-disable-next-line */
export interface AdminTypesProps {}

export function AdminTypes(props: AdminTypesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminTypes!</h1>
    </div>
  );
}

export default AdminTypes;
