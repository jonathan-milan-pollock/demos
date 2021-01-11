import React from 'react';
import dynamic from 'next/dynamic';

const IndexPage = dynamic(() => import('./index'));
const NotFoundPage = () => {
  return <IndexPage />;
};

export default NotFoundPage;
