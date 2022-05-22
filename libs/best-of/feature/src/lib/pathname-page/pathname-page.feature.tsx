import React from 'react';
import { useRouter } from 'next/router';

import styles from './pathname-page.module.scss';
import { ImagePublic } from '@dark-rush-photography/shared/types';
import { PageLayout } from '@dark-rush-photography/best-of/ui';

interface PathnamePageProps {
  images: ImagePublic[];
  displayImage(image: ImagePublic): void;
}

function PathnamePage(props: PathnamePageProps): JSX.Element {
  const router = useRouter();

  const slug = ''; //router.query.slug;
  return (
    <PageLayout>
      <>
        <div>
          <h1>{Array.isArray(slug) ? slug[0] : slug}</h1>
        </div>
        <button type="button"></button>
      </>
    </PageLayout>
  );
}

export default PathnamePage;
