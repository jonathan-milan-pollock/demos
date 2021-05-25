import React from 'react';

import {useRouter} from 'next/router';

import styles from './index.module.scss';

function Index(props): JSX.Element {

  const router = useRouter();

  function displayImageHandler(){
    router.push('/children/image1');
  }

  const images = props.images;

  return (
    <div className={styles.page}>
      <h1>Children</h1>
      <button onClick={displayImageHandler}>Display Child Image</button>
    </div>
  );
}

export async function getStaticProps() {
  // prepare props for this page
  // fetch data from an API
  return {
    props: {
      images: [{

      }]
    }
  };
}

export default Index;
