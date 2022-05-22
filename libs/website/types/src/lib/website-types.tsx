import styles from './website-types.module.scss';

/* eslint-disable-next-line */
export interface WebsiteTypesProps {}

export function WebsiteTypes(props: WebsiteTypesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebsiteTypes!</h1>
    </div>
  );
}

export default WebsiteTypes;
