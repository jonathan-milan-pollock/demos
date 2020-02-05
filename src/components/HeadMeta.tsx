import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import uuidv1 from 'uuid/v1';

import { PageType } from 'src/enums/PageType';
import { findPage, findPageUrl } from 'src/utils/Page';

interface Props {
    pageType: PageType;
}

HeadMeta.propTypes = {
    pageType: PropTypes.string.isRequired
};

export default function HeadMeta({ pageType }: Props): JSX.Element {
    const page = findPage(pageType);
    const pageUrl = findPageUrl(pageType);
    return (
        <Helmet>
            <title key={uuidv1()}>{page.title}</title>
            <meta
                key={uuidv1()}
                name="description"
                content={page.description}
            />
            <meta key={uuidv1()} property="og:title" content={page.title} />
            <meta key={uuidv1()} property="og:url" content={pageUrl} />
            <meta
                key={uuidv1()}
                property="og:description"
                content={page.description}
            />
            <link key={uuidv1()} rel="canonical" href={pageUrl} />
        </Helmet>
    );
}
