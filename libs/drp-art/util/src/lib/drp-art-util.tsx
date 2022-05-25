import styles from './drp-art-util.module.scss';

/* eslint-disable-next-line */
export interface DrpArtUtilProps {}

function DrpArtUtil(props: DrpArtUtilProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DrpArtUtil!</h1>
    </div>
  );
}

export default DrpArtUtil;
