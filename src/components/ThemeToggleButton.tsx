import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ThemeType } from 'src/enums/ThemeType';
import { changeTheme } from 'src/store/ThemeActions';
import { ReduxState } from 'src/store/RootReducer';

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            marginLeft: 'auto'
        },
        button: {
            color: theme.palette.custom.accentColor,
            margin: 10,
            outline: 'none',
            textDecoration: 'none',
            '&:focus': {
                color: theme.palette.custom.accentColor
            },
            '&:hover': {
                color: theme.palette.custom.accentColor
            }
        },
        icon: {
            marginRight: 10,
            width: 24,
            height: 24
        },
        buttonText: {
            fontSize: theme.palette.custom.smallFontSize
        }
    };
});

function ThemeToggleButton(props: any): JSX.Element {
    const { themeType, changeTheme } = props;
    const classes = useStyles();
    const iconName = themeType === ThemeType.Dark ? 'check-square' : 'square';

    return (
        <div className={classes.container}>
            <Button
                className={classes.button}
                onClick={() => {
                    changeTheme(
                        themeType === ThemeType.Dark
                            ? ThemeType.Light
                            : ThemeType.Dark
                    );
                }}
            >
                <FontAwesomeIcon
                    className={classes.icon}
                    icon={{ prefix: 'far', iconName: iconName }}
                    size="lg"
                />
                <span className={classes.buttonText}>DARK MODE</span>
            </Button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggleButton);
