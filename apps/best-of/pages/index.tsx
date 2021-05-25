import React from 'react';

import Link from 'next/link';

import styles from './index.module.scss';

function Index(): JSX.Element {
  return (
    <div className={styles.page}>
      <ul>
        <li><Link href="/children">Children</Link></li>
        <li><Link href="/events">Events</Link></li>
        <li><Link href="/landscape">Landscape</Link></li>
        <li><Link href="/nature">Nature</Link></li>
        <li><Link href="/real-estate">Real Estate</Link></li>
      </ul>
    </div>
  );
}

export default Index;
