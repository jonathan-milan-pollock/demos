import { GetStaticProps } from 'next';

import Story from '../../models/story';
import Layout from '../../components/Layout';
import { loadStories } from '../api/stories';

type Props = {
  stories: Story[];
};

const StoriesPage = ({ stories }: Props) => (
  <Layout title="Stories">
    {stories.map((story) => {
      return <h1 key={story.id}>{story.name}</h1>;
    })}
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const stories: Story[] = loadStories;
  return { props: { stories } };
};

export default StoriesPage;
