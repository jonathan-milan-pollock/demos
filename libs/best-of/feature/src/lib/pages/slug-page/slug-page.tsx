import React from 'react';
import { useRouter } from 'next/router';

import { ImagePublic } from '@dark-rush-photography/shared/types';
import PageLayout from '../../page-layout/page-layout';
import classes from './slug-page.module.scss';

interface Props {
  images: ImagePublic[];
  displayImage(image: ImagePublic): void;
}

export function SlugPage(props: Props): JSX.Element {
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

export default SlugPage;
