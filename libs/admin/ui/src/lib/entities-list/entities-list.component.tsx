import { useRouter } from 'next/router';

import { List, ListItemButton, ListItemText } from '@mui/material';

import styles from './entities-list.module.scss';
import { EntityType } from '@dark-rush-photography/shared/types';

interface EntitiesListProps {
  readonly entityType: EntityType;
  readonly entities: { pathname: string; imageUrl: string }[];
}

function EntitiesList(props: EntitiesListProps) {
  const router = useRouter();

  const handleListItemClick = (pathname: string) => {
    router.push(`${props.entityType}/${pathname}`);
  };

  return (
    <List className={styles['list']}>
      {props.entities.map((entity) => (
        <ListItemButton
          className={styles['listItem']}
          onClick={() => handleListItemClick(entity.pathname)}
        >
          <img
            src={entity.imageUrl}
            alt={entity.pathname}
            loading="lazy"
            width="80"
            height="80"
          />
          <ListItemText primary={entity.pathname} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default EntitiesList;
