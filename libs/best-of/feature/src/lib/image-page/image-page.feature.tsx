import styles from './image-page.module.scss';
import { PageLayout } from '@dark-rush-photography/best-of/ui';

interface ImagePageProps {
  storageId: string;
  pathname: string;
}

export function ImagePage({
  storageId,
  pathname: slug,
}: ImagePageProps): JSX.Element {
  return (
    <PageLayout>
      <div className={styles['page']}>
        {storageId}/{slug}
      </div>
    </PageLayout>
  );
}

export default ImagePage;
