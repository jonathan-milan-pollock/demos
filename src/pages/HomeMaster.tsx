import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Fade from '@material-ui/core/Fade';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ApplicationLayout from 'src/constants/ApplicationLayout';
import Layout from 'src/models/Layout';
import { findBrowserHasColorScrollbar } from 'src/utils/Browser';
import MasterScrollbarContent from 'src/components/master/MasterScrollbarContent';

interface StyleProps {
    outerContainerWidth: number | string;
    logoContainerHeight: number;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        outerContainer: {
            backgroundColor: theme.palette.custom.masterBackgroundColor,
            width: (props: StyleProps) => props.outerContainerWidth,
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        },
        outerContainerWithColorScrollbar: {
            overflowY: 'scroll'
        },
        logoContainer: {
            backgroundColor: theme.palette.custom.detailBackgroundColor,
            width: 265,
            height: 250,
            borderRadius: 40,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        image: {
            width: 260,
            height: 90,
            marginTop: 8,
            objectFit: 'contain'
        },
        contactContainer: {
            marginTop: 10,
            marginBottom: 10
        },
        contact: {
            color: 'white',
            fontWeight: 600,
            textDecorationColor: theme.palette.custom.accentColor,
            WebkitTextDecorationColor: theme.palette.custom.accentColor
        }
    };
});

interface Props {
    layout: Layout;
}

HomeMaster.propTypes = {
    layout: PropTypes.object.isRequired
};

export default function HomeMaster({ layout }: Props): JSX.Element {
    const classes = useStyles({
        outerContainerWidth: layout.isLargeWindowWidth
            ? ApplicationLayout.MASTER_WIDTH
            : '100%',
        logoContainerHeight: layout.mainHeight
    });

    const renderLogo = () => {
        if (!layout.isLargeWindowWidth)
            return (
                <MasterScrollbarContent
                    layout={layout}
                    renderItem={<Fragment />}
                />
            );
        return (
            <div
                className={
                    findBrowserHasColorScrollbar()
                        ? `${classes.outerContainer} ${classes.outerContainerWithColorScrollbar}`
                        : classes.outerContainer
                }
            >
                <Fade in={true} timeout={{ enter: 700 }}>
                    <div>
                        <div className={classes.logoContainer}></div>
                    </div>
                </Fade>
            </div>
        );
    };

    return <Fragment>{renderLogo()}</Fragment>;
}
