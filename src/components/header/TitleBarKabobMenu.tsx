import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ThemeType } from 'src/enums/ThemeType';
import { changeTheme } from 'src/store/ThemeActions';
import { ReduxState } from 'src/store/RootReducer';

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            marginLeft: 'auto'
        },
        kabobIcon: {
            color: theme.palette.custom.headerIconColor
        },
        menu: {
            marginTop: 35,
            curosr: 'pointer',
            '& ul': {
                backgroundColor: theme.palette.custom.headerBackgroundColor
            }
        },
        menuItem: {
            backgroundColor: theme.palette.custom.headerBackgroundColor,
            '&:focus': {
                border: 0,
                outline: 'none'
            },
            '&:hover': {
                '& $icon': {
                    color: theme.palette.custom.accentColor
                },
                '& $text': {
                    color: theme.palette.custom.accentColor
                }
            }
        },
        icon: {
            color: theme.palette.custom.iconColor
        },
        text: {
            color: theme.palette.custom.headerAccentColor,
            fontSize: theme.palette.custom.kabobMenuFontSize,
            marginLeft: -20
        }
    };
});

TitleBarKabobMenu.propTypes = {
    themeType: PropTypes.number,
    changeTheme: PropTypes.func
};

function TitleBarKabobMenu(props: any): JSX.Element {
    const { themeType, changeTheme } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const handleClick = (event: any) => {
        if (anchorEl === null) setAnchorEl(event.currentTarget);
        else setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeDarkMode = () => {
        changeTheme(
            themeType === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
        );
        handleClose();
    };

    return (
        <Fragment>
            <IconButton
                className={classes.container}
                aria-controls="title-bar-kabob-menu"
                aria-haspopup="true"
                onClick={handleClick}
                data-testid="title-bar-kabob-menu"
            >
                <MoreVertIcon className={classes.kabobIcon} />
            </IconButton>
            <Paper>
                <Menu
                    id="title-bar-kabob-menu"
                    className={classes.menu}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        className={`${classes.menuItem} title-bar-kabob-menu-item`}
                        onClick={() => {
                            changeDarkMode();
                        }}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon
                                className={classes.icon}
                                icon={{
                                    prefix: 'far',
                                    iconName:
                                        themeType === ThemeType.Dark
                                            ? 'check-square'
                                            : 'square'
                                }}
                                size="lg"
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="DARK MODE"
                            classes={{ primary: classes.text }}
                        />
                    </MenuItem>
                </Menu>
            </Paper>
        </Fragment>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    themeType: state.theme.themeType
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            changeTheme
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TitleBarKabobMenu);
