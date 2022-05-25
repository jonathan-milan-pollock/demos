import React from 'react';
import {
  EntityMinimalPublic,
  EntityPublic,
} from '@dark-rush-photography/shared/types';
import { AboutPage } from '@dark-rush-photography/website/feature';

function Index() {
  return <AboutPage />;
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      aboutMinimalEntities: [] as EntityMinimalPublic[],
      aboutEntities: [] as EntityPublic[],
    },
  };
}

export default Index;
