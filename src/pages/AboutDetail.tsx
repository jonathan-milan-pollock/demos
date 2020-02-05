import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Layout from 'src/models/Layout';
import DetailScrollbarContent from 'src/components/detail/DetailScrollbarContent';

interface Props {
    layout: Layout;
}

AboutDetail.propTypes = {
    layout: PropTypes.object.isRequired
};

export default function AboutDetail({ layout }: Props): JSX.Element {
    if (!layout.isLargeWindowWidth) return <Fragment />;

    return <DetailScrollbarContent layout={layout} renderItem={<div></div>} />;
}
