import React from 'react';
import { useRouter } from 'next/router';

import { ThreeSixtyImagePage } from '@dark-rush-photography/best-of/feature';

function ThreeSixty(): JSX.Element {
  const router = useRouter();

  const threeSixtyImageStorageId = router.query.storageId;
  return (
    <ThreeSixtyImagePage
      threeSixtyImageStorageId={
        Array.isArray(threeSixtyImageStorageId)
          ? threeSixtyImageStorageId[0]
          : threeSixtyImageStorageId
      }
    />
  );
}

export default ThreeSixty;
