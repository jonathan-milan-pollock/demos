import styles from './about-page.module.scss';
import {
  EntityMinimalPublic,
  EntityPublic,
} from '@dark-rush-photography/shared/types';
import { PageLayout } from '@dark-rush-photography/best-of/ui';

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
