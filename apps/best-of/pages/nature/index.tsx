import React from 'react';
import { useRouter } from 'next/router';

import { ImagePublic } from '@dark-rush-photography/shared/types';
import { PathnamePage } from '@dark-rush-photography/best-of/feature';

interface Props {
  images: ImagePublic[];
}

function Index(props: Props): JSX.Element {
  const router = useRouter();

  function displayImageHandler(image: ImagePublic) {
    router.push(
      `/nature/${
        image.threeSixtyImageStorageId
          ? image.threeSixtyImageStorageId
          : image.storageId
      }`
    );
  }

  return (
    <PathnamePage images={props.images} displayImage={displayImageHandler} />
  );
}

export async function getStaticProps() {
  return {
    props: {
      images: [{}] as ImagePublic[], // will get images for nature
    },
  };
}

export default Index;
