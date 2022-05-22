import styles from './bottom-divider.module.scss';

export default function BottomDividerComponent() {
  return <hr className={styles['container']} data-testid="bottom-divider" />;
}
