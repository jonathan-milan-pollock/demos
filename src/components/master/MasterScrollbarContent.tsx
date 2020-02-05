import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Fade from '@material-ui/core/Fade';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ApplicationLayout from 'src/constants/ApplicationLayout';
import Layout from 'src/models/Layout';
import { findBrowserHasColorScrollbar } from 'src/utils/Browser';
import ColorScrollbar from 'src/components/ColorScrollbar';

interface StyleProps {
    width: string | number;
}
const useStyles = makeStyles((theme: Theme) => {
    return {
        colorScrollbar: {
            backgroundColor: theme.palette.custom.masterBackgroundColor,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            top: 0,
            width: (props: StyleProps) => props.width,
            height: '100%',
            padding: 0
        },
        scrollbar: {
            backgroundColor: theme.palette.custom.masterBackgroundColor,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            top: 0,
            width: (props: StyleProps) => props.width,
            height: '100%',
            overflowY: 'scroll'
        }
    };
});

interface Props {
    layout: Layout;
    renderItem?: JSX.Element;
}

MasterScrollbarContent.propTypes = {
    layout: PropTypes.object.isRequired,
    renderItem: PropTypes.node
};

export default function MasterScrollbarContent({
    layout,
    renderItem
}: Props): JSX.Element {
    const classes = useStyles({
        width: layout.isLargeWindowWidth
            ? ApplicationLayout.MASTER_WIDTH
            : '100%'
    });

    const renderContent = () => {
        if (findBrowserHasColorScrollbar()) {
            return (
                <div className={classes.scrollbar}>
                    <Fade in={true} timeout={{ enter: 800 }}>
                        <div data-testid="scrollbar">{renderItem}</div>
                    </Fade>
                </div>
            );
        } else {
            return (
                <Fade in={true} timeout={{ enter: 800 }}>
                    <div className={classes.colorScrollbar}>
                        <ColorScrollbar>{renderItem}</ColorScrollbar>
                    </div>
                </Fade>
            );
        }
    };

    return <Fragment>{renderContent()}</Fragment>;
}
