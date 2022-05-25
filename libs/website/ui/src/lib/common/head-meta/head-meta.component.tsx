//import { v4 as uuidv4 } from 'uuid';

import styles from './head-meta.module.scss';

interface Props {
  title: string;
  description: string;
  pageUrl: string;
}

export default function HeadMeta(props: Props) {
  return;
  /*
    return (
        <Helmet>
            <title key={uuidv4()}>{title}</title>
            <meta key={uuidv4()} name="description" content={description} />
            <meta key={uuidv4()} property="og:title" content={title} />
            <meta key={uuidv4()} property="og:url" content={pageUrl} />
            <meta
                key={uuidv4()}
                property="og:description"
                content={description}
            />
            <link key={uuidv4()} rel="canonical" href={pageUrl} />
        </Helmet>
    );*/
}
