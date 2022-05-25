import React from 'react';
import { useRouter } from 'next/router';

import { ImagePage } from '@dark-rush-photography/best-of/feature';

function Index(): JSX.Element {
  const router = useRouter();

  const storageId = router.query.storageId;
  const pathname = router.query.pathname;
  return (
    <ImagePage
      storageId={Array.isArray(storageId) ? storageId[0] : storageId}
      pathname={Array.isArray(pathname) ? pathname[0] : pathname}
    />
  );
}

export default Index;
