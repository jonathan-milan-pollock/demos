import Link from 'next/link';
import Layout from '../components/Layout';

const ReviewPage = () => (
  <Layout title='Dark Rush Photography'>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default ReviewPage;
