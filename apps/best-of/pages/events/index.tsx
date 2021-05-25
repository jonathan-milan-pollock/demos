import React from 'react';

import {useRouter} from 'next/router';

import styles from './index.module.scss';

function Index(): JSX.Element {

  const router = useRouter();

  function displayImageHandler(){
    router.push('/events/image1');
  }

  return (
    <div className={styles.page}>
       <h1>Events</h1>
       <button onClick={displayImageHandler}>Display Event Image</button>
    </div>
  );
}

export default Index;
