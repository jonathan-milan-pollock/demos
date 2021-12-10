import {
  EntityMinimalPublic,
  EntityPublic,
} from '@dark-rush-photography/shared/types';
import PageLayout from '../../layout/page-layout/page-layout';
import classes from './about-page.module.scss';

interface Props {
  aboutMinimalEntities: EntityMinimalPublic[];
  aboutEntities: EntityPublic[];
}

export function AboutPage({
  aboutMinimalEntities,
  aboutEntities,
}: Props): JSX.Element {
  return (
    <PageLayout>
      <div>About</div>
    </PageLayout>
  );
}

export default AboutPage;
