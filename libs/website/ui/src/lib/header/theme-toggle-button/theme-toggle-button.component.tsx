import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ThemeType } from '@dark-rush-photography/website/types';
import styles from './theme-toggle-button.module.scss';

export default function ThemeToggleButton(props: any): JSX.Element {
  const { themeType, actions } = props;

  const isDarkTheme = themeType === ThemeType.Dark;

  return (
    <div className={styles['container']}>
      <Button
        className={styles['button']}
        onClick={() => {
          actions.changeThemeType(
            themeType === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
          );
        }}
      >
        <FontAwesomeIcon
          className={styles['icon']}
          icon={{
            prefix: 'far',
            iconName: isDarkTheme ? 'check-square' : 'square',
          }}
          size="lg"
        />
        <span className={styles['buttonText']}>DARK MODE</span>
      </Button>
    </div>
  );
}

/*
const mapStateToProps = (state: ReduxState) => ({
  themeType: state.theme.themeType,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        changeThemeType,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggleButton);
*/
