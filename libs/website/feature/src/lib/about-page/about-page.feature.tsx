import styles from './about-page.module.scss';
import { PageType } from '@dark-rush-photography/website/types';
import { useLayout } from '@dark-rush-photography/website/util';
import { PageContainer } from '@dark-rush-photography/website/ui';
import AboutMaster from '../about-master/about-master.feature';
import AboutDetail from '../about-detail/about-detail.feature';

function AboutPage(): JSX.Element {
  const layout = useLayout(PageType.About);
  return (
    <PageContainer pageType={PageType.About} layout={layout}>
      <>
        <AboutMaster />
        <AboutDetail />
      </>
    </PageContainer>
  );
}

export default AboutPage;
