import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { PageType } from 'src/enums/PageType';
import Layout from 'src/models/Layout';
import HeadMeta from 'src/components/HeadMeta';
import TitleBar from 'src/components/header/TitleBar';
import TopNavigationBar from 'src/components/header/TopNavigationBar';
import BottomDivider from 'src/components/footer/BottomDivider';
import BottomNavigationBar from 'src/components/footer/BottomNavigationBar';

interface StyleProps {
    mainTop: number;
    mainBottom: number;
    footerHeight: number;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        header: {
            backgroundColor: theme.palette.custom.headerBackgroundColor,
            display: 'block',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 2000
        },
        main: {
            backgroundColor: theme.palette.custom.mainBackgroundColor,
            position: 'fixed',
            left: 0,
            top: (props: StyleProps) => props.mainTop,
            bottom: (props: StyleProps) => props.mainBottom,
            width: '100%',
            overflow: 'hidden'
        },
        footer: {
            display: 'block',
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            height: (props: StyleProps) => props.footerHeight,
            zIndex: 2000
        }
    };
});

interface Props {
    pageType: PageType;
    layout: Layout;
    renderItem: JSX.Element;
}

PageContainer.propTypes = {
    pageType: PropTypes.string.isRequired,
    layout: PropTypes.object.isRequired,
    renderItem: PropTypes.object.isRequired
};

export default function PageContainer({
    pageType,
    layout,
    renderItem
}: Props): JSX.Element {
    const classes = useStyles({
        mainTop: layout.headerHeight,
        mainBottom: layout.footerHeight,
        footerHeight: layout.footerHeight
    });

    return (
        <Fragment>
            <HeadMeta pageType={pageType} />
            <div className={classes.header}>
                <TitleBar isDisplayed={!layout.isLargeWindowWidth} />
                <TopNavigationBar
                    pageType={pageType}
                    isDisplayed={layout.isLargeWindowWidth}
                />
            </div>
            <div className={classes.main}>{renderItem}</div>
            <div className={classes.footer}>
                <BottomDivider />
                <BottomNavigationBar
                    isDisplayed={layout.isBottomNavigationBarDisplayed}
                />
            </div>
        </Fragment>
    );
}
