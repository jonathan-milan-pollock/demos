import { Fragment, useState } from 'react';

import {
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './title-bar-kabob-menu.module.scss';
import {
  BrowserWindow,
  SocialMediaUrl,
  ThemeType,
} from '@dark-rush-photography/website/types';
import { openInBrowserWindow } from '@dark-rush-photography/website/util';

export default function TitleBarKabobMenu(props: any): JSX.Element {
  const { themeType, actions } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //<MoreVertIcon className={classes.kabobIcon} />
  return (
    <Fragment>
      <IconButton
        className={styles['container']}
        aria-controls="title-bar-kabob-menu"
        aria-haspopup="true"
        onClick={handleClick}
        data-testid="title-bar-kabob-menu"
      ></IconButton>
      <Paper className={styles['root']}>
        <Menu
          className={styles['menu']}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            className={`${styles['menuItem']} title-bar-kabob-menu-item`}
            onClick={() => {
              openInBrowserWindow(
                window as BrowserWindow,
                SocialMediaUrl.FACEBOOK
              );
              handleClose();
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                className={styles['icon']}
                icon={{
                  prefix: 'fab',
                  iconName: 'facebook-square',
                }}
                size="lg"
              />
            </ListItemIcon>
            <ListItemText
              primary="FACEBOOK"
              classes={{ primary: styles['text'] }}
            />
          </MenuItem>
          <MenuItem
            className={`${styles['menuItem']} title-bar-kabob-menu-item`}
            onClick={() => {
              openInBrowserWindow(
                window as BrowserWindow,
                SocialMediaUrl.INSTAGRAM
              );
              handleClose();
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                className={styles['icon']}
                icon={{ prefix: 'fab', iconName: 'instagram' }}
                size="lg"
              />
            </ListItemIcon>
            <ListItemText primary="INSTAGRAM" className={styles['text']} />
          </MenuItem>
          <MenuItem
            className={`${styles['menuItem']} title-bar-kabob-menu-item`}
            onClick={() => {
              openInBrowserWindow(
                window as BrowserWindow,
                SocialMediaUrl.LINKEDIN
              );
              handleClose();
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                className={styles['icon']}
                icon={{ prefix: 'fab', iconName: 'linkedin' }}
                size="lg"
              />
            </ListItemIcon>
            <ListItemText
              primary="LINKEDIN"
              classes={{ primary: styles['text'] }}
            />
          </MenuItem>
          <MenuItem
            className={`${styles['menuItem']} title-bar-kabob-menu-item`}
            onClick={() => {
              openInBrowserWindow(
                window as BrowserWindow,
                SocialMediaUrl.YOUTUBE
              );
              handleClose();
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                className={styles['icon']}
                icon={{ prefix: 'fab', iconName: 'youtube' }}
                size="lg"
              />
            </ListItemIcon>
            <ListItemText
              primary="YOUTUBE"
              classes={{ primary: styles['text'] }}
            />
          </MenuItem>
          <MenuItem
            className={`${styles['menuItem']} title-bar-kabob-menu-item`}
            onClick={() => {
              actions.changeThemeType(
                themeType === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
              );
              handleClose();
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                className={styles['icon']}
                icon={{
                  prefix: 'far',
                  iconName:
                    themeType === ThemeType.Dark ? 'check-square' : 'square',
                }}
                size="lg"
              />
            </ListItemIcon>
            <ListItemText primary="DARK MODE" className={styles['text']} />
          </MenuItem>
        </Menu>
      </Paper>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(TitleBarKabobMenu);
*/
