import styles from './website-util.module.scss';

/* eslint-disable-next-line */
export interface WebsiteUtilProps {}

export function WebsiteUtil(props: WebsiteUtilProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebsiteUtil!</h1>
    </div>
  );
}

export default WebsiteUtil;
