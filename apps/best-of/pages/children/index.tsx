import React from 'react';
import { useRouter } from 'next/router';

import { ImagePublic } from '@dark-rush-photography/shared/types';
import { getImagePageUrl } from '@dark-rush-photography/best-of/util';
import { PathnamePage } from '@dark-rush-photography/best-of/feature';

interface Props {
  images: ImagePublic[];
}

function Index(props: Props): JSX.Element {
  const router = useRouter();

  function displayImageHandler(image: ImagePublic) {
    router.push(
      getImagePageUrl(
        'children',
        image.storageId,
        image.threeSixtyImageStorageId
      )
    );
  }

  return (
    <PathnamePage images={props.images} displayImage={displayImageHandler} />
  );
}

export async function getStaticProps() {
  return {
    props: {
      images: [{}] as ImagePublic[], // will get images for children
    },
  };
}

export default Index;
