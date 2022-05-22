import styles from './admin-ui.module.scss';

/* eslint-disable-next-line */
export interface AdminUiProps {}

export function AdminUi(props: AdminUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminUi!</h1>
    </div>
  );
}

export default AdminUi;
