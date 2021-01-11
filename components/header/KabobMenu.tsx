import React, { Fragment, useState } from 'react';

import useDarkMode from 'use-dark-mode';

import {
  makeStyles,
  Theme,
  IconButton,
  Paper,
  Menu,
  Fade,
  MenuItem,
} from '@material-ui/core';

//import BrowserWindow from 'src/models/BrowserWindow';
//import { openInBrowserWindow } from 'src/utils/Browser';
//import ApplicationUrl from '../../constants/app-url-constants';
import KabobMenuItem from './KabobMenuItem';
import FontAwesomeIconEm from '../FontAwesomeIconEm';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      zIndex: 6000,
    },
    iconButton: {
      color: 'white',
    },
    menu: {
      marginTop: 40,
      zIndex: 4000,
      cursor: 'pointer',
      '& ul': {
        backgroundColor: theme.palette.custom.headerBackgroundColor,
      },
    },
  };
});

const KabobMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const darkMode = useDarkMode(false);

  const handleClick = (event: any) => {
    if (anchorEl === null) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton className={classes.iconButton} onClick={handleClick}>
        <FontAwesomeIconEm
          icon={{ prefix: 'far', iconName: 'ellipsis-v' }}
          widthInEm={0.25}
        />
      </IconButton>
      <Paper className={classes.root}>
        <Menu
          className={classes.menu}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              /*openInBrowserWindow(
                window as BrowserWindow,
                ApplicationUrl.FACEBOOK
              );
              */
              handleClose();
            }}
          >
            <KabobMenuItem
              icon={{
                prefix: 'fab',
                iconName: 'facebook-square',
              }}
              text='FACEBOOK'
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              /*openInBrowserWindow(
                window as BrowserWindow,
                ApplicationUrl.FACEBOOK
              );
              */
              handleClose();
            }}
          >
            <KabobMenuItem
              icon={{
                prefix: 'fab',
                iconName: 'instagram',
              }}
              text='INSTAGRAM'
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              /*openInBrowserWindow(
                window as BrowserWindow,
                ApplicationUrl.FACEBOOK
              );
              */
              handleClose();
            }}
          >
            <KabobMenuItem
              icon={{
                prefix: 'fab',
                iconName: 'linkedin',
              }}
              text='LINKEDIN'
              /*onClick={() => {
              openInBrowserWindow(
                window as BrowserWindow,
                ApplicationUrl.FACEBOOK
              );
              handleClose();
            }}*/
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              /*openInBrowserWindow(
                window as BrowserWindow,
                ApplicationUrl.FACEBOOK
              );
              */
              handleClose();
            }}
          >
            <KabobMenuItem
              icon={{
                prefix: 'fab',
                iconName: 'youtube',
              }}
              text='YOUTUBE'
              /*onClick={() => {
              openInBrowserWindow(
                window as BrowserWindow,
                ApplicationUrl.FACEBOOK
              );
              handleClose();
            }}*/
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              darkMode.toggle();
              handleClose();
            }}
          >
            <KabobMenuItem
              icon={{
                prefix: 'far',
                iconName: darkMode.value ? 'check-square' : 'square',
              }}
              text='DARK MODE'
            />
          </MenuItem>
        </Menu>
      </Paper>
    </Fragment>
  );
};

export default KabobMenu;
