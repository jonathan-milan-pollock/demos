import styles from './website-ui.module.scss';

/* eslint-disable-next-line */
export interface WebsiteUiProps {}

export function WebsiteUi(props: WebsiteUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebsiteUi!</h1>
    </div>
  );
}

export default WebsiteUi;
