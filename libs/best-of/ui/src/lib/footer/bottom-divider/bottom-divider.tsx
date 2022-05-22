import classes from './bottom-divider.module.scss';

function BottomDivider() {
  return <hr className={classes.horizontalRule} data-testid="bottom-divider" />;
}

export default BottomDivider;
