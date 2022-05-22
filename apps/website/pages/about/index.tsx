import React from 'react';
import {
  EntityMinimalPublic,
  EntityPublic,
} from '@dark-rush-photography/shared/types';
import { AboutPage } from '@dark-rush-photography/website/feature';

interface Props {
  aboutMinimalEntities: EntityMinimalPublic[];
  aboutEntities: EntityPublic[];
}

function Index(props: Props) {
  return (
    <AboutPage
      aboutMinimalEntities={props.aboutMinimalEntities}
      aboutEntities={props.aboutEntities}
    />
  );
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
