import React, {useEffect, useState} from 'react';

import { useRouter } from 'next/router';

import styles from './image.module.scss';
import { Image } from '@dark-rush-photography/best-of/ui';

function ChildImage(): JSX.Element {

  const router = useRouter();     
  
  const imageSlug = router.query.imageSlug;

  return (
    <div className={styles.page}>
      <Image src='http://www.marciahebert.com/wp-content/uploads/2011/08/The-Hundred-Languages.jpg'
        alt='Joey'
        title='Child Image'></Image> 
    </div>
  );
}

export default ChildImage;
