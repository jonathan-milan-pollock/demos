import { useRouter } from 'next/router';

import styles from './page-layout.module.scss';
import {
  ImageDisplayModeBar,
  TabBar,
  TopNavigationBar,
} from '@dark-rush-photography/best-of/ui';

type Props = {
  children: JSX.Element;
};

function PageLayout({ children }: Props) {
  const router = useRouter();

  return (
    <>
      <nav>
        <TopNavigationBar
          isDarkTheme={true}
          activeLink="/"
          onToggleTheme={() => {
            console.log('toggle theme');
          }}
          onLinkClicked={(link) => {
            router.push(link);
          }}
        />
        <TabBar
          activeLink={router.pathname === '/' ? '/events' : router.pathname}
          onTabChange={(link) => {
            router.push(link);
          }}
        />
        <ImageDisplayModeBar />
      </nav>
      {children}
    </>
  );
}

export default PageLayout;
