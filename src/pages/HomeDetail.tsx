import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Layout from 'src/models/Layout';
import DetailScrollbarContent from 'src/components/detail/DetailScrollbarContent';

interface StyleProps {
    marginTop: number;
}
const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            marginTop: (props: StyleProps) => props.marginTop + 105
        }
    };
});

interface Props {
    layout: Layout;
}

HomeDetail.propTypes = {
    layout: PropTypes.object.isRequired
};

export default function HomeDetail({ layout }: Props): JSX.Element {
    const classes = useStyles({
        marginTop: ((layout.detailWidth - 400) * 5) / 7
    });

    if (!layout.isLargeWindowWidth) return <Fragment />;

    return (
        <DetailScrollbarContent
            layout={layout}
            renderItem={<div className={classes.container} />}
        />
    );
}
