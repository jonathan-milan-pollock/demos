import React, { Fragment } from 'react';

import { PageType } from 'src/enums/PageType';
import { useLayout } from 'src/hooks/UseLayout';
import PageContainer from 'src/components/PageContainer';
import AboutMaster from 'src/pages/AboutMaster';
import AboutDetail from 'src/pages/AboutDetail';

export default function About(): JSX.Element {
    const layout = useLayout(PageType.About);

    return (
        <PageContainer
            pageType={PageType.About}
            layout={layout}
            renderItem={
                <Fragment>
                    <AboutMaster layout={layout} />
                    <AboutDetail layout={layout} />
                </Fragment>
            }
        />
    );
}
