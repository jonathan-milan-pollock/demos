import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Theme } from '@material-ui/core/styles';

import ApplicationLayout from 'src/constants/ApplicationLayout';
import Layout from 'src/models/Layout';
import { findBrowserHasColorScrollbar } from 'src/utils/Browser';
import ColorScrollbar from 'src/components/ColorScrollbar';

interface StyleProps {
    width: number;
    marginLeft: number;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        scrollbar: {
            backgroundColor: theme.palette.custom.detailBackgroundColor,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            top: 0,
            width: (props: StyleProps) => props.width,
            height: '100%',
            overflowY: 'scroll',
            marginLeft: (props: StyleProps) => props.marginLeft
        },
        colorScrollbar: {
            backgroundColor: theme.palette.custom.detailBackgroundColor,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            top: 0,
            width: (props: StyleProps) => props.width,
            height: '100%',
            marginLeft: (props: StyleProps) => props.marginLeft,
            padding: 0
        }
    };
});

interface Props {
    layout: Layout;
    renderItem?: JSX.Element;
}

DetailScrollbarContent.propTypes = {
    renderItem: PropTypes.node
};

export default function DetailScrollbarContent({
    layout,
    renderItem
}: Props): JSX.Element {
    const classes = useStyles({
        width: layout.detailWidth,
        marginLeft: ApplicationLayout.MASTER_WIDTH + 1
    });

    const renderContent = () => {
        if (findBrowserHasColorScrollbar()) {
            return (
                <div className={classes.scrollbar}>
                    <div data-testid="scrollbar">{renderItem}</div>
                </div>
            );
        } else {
            return (
                <div className={classes.colorScrollbar}>
                    <ColorScrollbar>{renderItem}</ColorScrollbar>
                </div>
            );
        }
    };

    return <Fragment>{renderContent()}</Fragment>;
}
