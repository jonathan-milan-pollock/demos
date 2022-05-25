import styles from './admin-util.module.scss';

/* eslint-disable-next-line */
export interface AdminUtilProps {}

function AdminUtil(props: AdminUtilProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminUtil!</h1>
    </div>
  );
}

export default AdminUtil;
