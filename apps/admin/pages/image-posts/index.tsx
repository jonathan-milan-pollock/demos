import Head from 'next/head';

import { EntityType, ImagePublic } from '@dark-rush-photography/shared/types';
import { MainPage } from '@dark-rush-photography/admin/feature';

interface IndexProps {
  images: ImagePublic[];
}

function Index(props: IndexProps): JSX.Element {
  return (
    <>
      <Head>
        <title>DRP Dance - Image Post</title>
      </Head>
      <MainPage entityType={EntityType.ImagePost}></MainPage>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      images: [{}] as ImagePublic[], // will get images for events
    },
  };
}

export default Index;
