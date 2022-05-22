import styles from './best-of-ui.module.scss';

/* eslint-disable-next-line */
export interface BestOfUiProps {}

export function BestOfUi(props: BestOfUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BestOfUi!</h1>
    </div>
  );
}

export default BestOfUi;
