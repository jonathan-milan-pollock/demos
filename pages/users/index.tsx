import { GetStaticProps } from 'next';
import Link from 'next/link';

import Layout from '../../components/Layout';

/*
type Props = {
  items: any[];
};
*/
//<List items={items} /> was after <p>You are currently on: /users</p>
//{ items }: Props
const WithStaticProps = () => (
  <Layout title='Users List | Next.js + TypeScript Example'>
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>

    <p>
      <Link href='/'>
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: any[] = []; // was const items: User[] = [];
  return { props: { items } };
};

export default WithStaticProps;
