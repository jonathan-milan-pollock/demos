import React from 'react';
import 'reflect-metadata';
import 'zone.js';

import { useRouter } from 'next/router';

import styles from './index.module.scss';

function Index(): JSX.Element {
  const router = useRouter();

  React.useEffect(() => {
    import('@dark-rush-photography/progressive-image');
  }, []);

  function displayImageHandler() {
    router.push('/events/image1');
  }

  return (
    <div className={styles.page}>
      <progressive-image
        thumbnailSrc={'https://picsum.photos/id/2/25/12'}
        imageSrc={'https://picsum.photos/id/2/256/128'}
        width={'256px'}
        height={'128px'}
        transitionMilliseconds={500}
      ></progressive-image>
      <h1>Events</h1>
      <button onClick={displayImageHandler}>Display Event Image</button>
    </div>
  );
}

export default Index;
