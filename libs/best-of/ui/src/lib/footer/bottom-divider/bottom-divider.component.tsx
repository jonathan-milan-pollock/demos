import styles from './bottom-divider.module.scss';

function BottomDivider() {
  return (
    <hr className={styles['horizontalRule']} data-testid="bottom-divider" />
  );
}

export default BottomDivider;
