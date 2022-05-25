import styles from './best-of-data.module.scss';

/* eslint-disable-next-line */
export interface BestOfDataProps {}

function BestOfData(props: BestOfDataProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BestOfData!</h1>
    </div>
  );
}

export default BestOfData;
