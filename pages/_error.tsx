import React from 'react';
import dynamic from 'next/dynamic';

const IndexPage = dynamic(() => import('./index'));
const ErrorPage = () => {
  return <IndexPage />;
};

export default ErrorPage;
