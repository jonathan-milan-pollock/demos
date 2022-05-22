import React from 'react';
import { useRouter } from 'next/router';

import { ImagePage } from '@dark-rush-photography/best-of/feature';

function Index(): JSX.Element {
  const router = useRouter();

  const storageId = router.query.storageId;
  const slug = router.query.slug;
  return (
    <ImagePage
      storageId={Array.isArray(storageId) ? storageId[0] : storageId}
      slug={Array.isArray(slug) ? slug[0] : slug}
    />
  );
}

export default Index;
