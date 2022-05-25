import styles from './image-page.module.scss';
import { PageLayout } from '@dark-rush-photography/best-of/ui';

interface ImagePageProps {
  storageId: string;
  pathname: string;
}

function ImagePage({
  storageId,
  pathname: pathname,
}: ImagePageProps): JSX.Element {
  return (
    <PageLayout>
      <div className={styles['page']}>
        {storageId}/{pathname}
      </div>
    </PageLayout>
  );
}

export default ImagePage;
