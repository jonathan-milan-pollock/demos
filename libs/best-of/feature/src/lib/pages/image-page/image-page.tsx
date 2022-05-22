import React from 'react';

import ImagePageLayout from '../../layout/page-layout/page-layout';
import classes from './image-page.module.scss';

interface Props {
  storageId: string;
  slug: string;
}

export function ImagePage({ storageId, slug }: Props): JSX.Element {
  return (
    <ImagePageLayout>
      <div className={classes.page}>
        {storageId}/{slug}
      </div>
    </ImagePageLayout>
  );
}

export default ImagePage;
