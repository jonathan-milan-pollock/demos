import React, { Fragment } from 'react';

import { PageType } from 'src/enums/PageType';
import { useLayout } from 'src/hooks/UseLayout';

import PageContainer from 'src/components/PageContainer';
import HomeMaster from 'src/pages/HomeMaster';
import HomeDetail from 'src/pages/HomeDetail';

export default function Home(): JSX.Element {
    const layout = useLayout(PageType.Home);

    return (
        <PageContainer
            pageType={PageType.Home}
            layout={layout}
            renderItem={
                <Fragment>
                    <HomeMaster layout={layout} />
                    <HomeDetail layout={layout} />
                </Fragment>
            }
        />
    );
}
