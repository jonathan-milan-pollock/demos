import React from 'react';
import { useRouter } from 'next/router';

import { TopNavigationBar } from '@dark-rush-photography/best-of/ui';
import classes from './image-page-layout.module.scss';

type Props = {
  children: JSX.Element;
};

function ImagePageLayout({ children }: Props) {
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
      </nav>
      {children}
    </>
  );
}

export default ImagePageLayout;
