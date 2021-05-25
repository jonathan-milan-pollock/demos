import React from 'react';

import { useRouter } from 'next/router';

import styles from './image.module.scss';

function Image(): JSX.Element {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <h1>Real Estate Image</h1>
      <h2>{router.query.imageSlug}</h2>
    </div>
  );
}

export default Image;
