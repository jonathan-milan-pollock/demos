import styles from './admin-data.module.scss';

/* eslint-disable-next-line */
export interface AdminDataProps {}

function AdminData(props: AdminDataProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminData!</h1>
    </div>
  );
}

export default AdminData;
