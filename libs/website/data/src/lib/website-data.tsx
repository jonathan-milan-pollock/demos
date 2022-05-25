import styles from './website-data.module.scss';

/* eslint-disable-next-line */
export interface WebsiteDataProps {}

function WebsiteData(props: WebsiteDataProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebsiteData!</h1>
    </div>
  );
}

export default WebsiteData;
