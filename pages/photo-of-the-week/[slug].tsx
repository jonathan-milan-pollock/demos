import { GetStaticProps, GetStaticPaths } from 'next';

import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import glob from 'glob';

type Props = {
  fontmatter: { title: string };
  markdownBody: string;
};

/*
 <Link href='/users/[id]' as={`/users/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
*/

const PhotoOfTheWeekTemplate = ({ fontmatter, markdownBody }: Props) => {
  return (
    <Layout title={fontmatter.title}>
      <article>
        <h1>{fontmatter.title}</h1>
        <div>
          <ReactMarkdown source={markdownBody} />
        </div>
      </article>
    </Layout>
  );
};

export default PhotoOfTheWeekTemplate;

export const getStaticPaths: GetStaticPaths = async () => {
  const weeklyPhotos = glob.sync('photo-of-the-week/*.md');

  const photoOfTheWeekSlugs = weeklyPhotos.map((file) =>
    file.split('/')[1].slice(0, -3).trim()
  );
  const paths = photoOfTheWeekSlugs.map((slug) => `/photo-of-the-week/${slug}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  const content = await import(`../../markdown/photo-of-the-week/${slug}.md`);
  const data = matter(content.default);

  //TODO: Will need to check what is available to be displayed

  console.log(data);

  return {
    props: {
      fontmatter: data.data,
      markdownBody: data.content,
    },
  };
};
