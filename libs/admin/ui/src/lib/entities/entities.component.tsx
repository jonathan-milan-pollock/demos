import { Box, Toolbar } from '@mui/material';

import styles from './entities.module.scss';
import { EntityType } from '@dark-rush-photography/shared/types';
import EntitiesList from '../entities-list/entities-list.component';
import Entity from '../entity/entity.component';

interface EntitiesProps {
  entityType: EntityType;
  entities: { pathname: string; imageUrl: string }[];
  isDrawerOpen: boolean;
  isEditEntityDialogOpen: boolean;
  setIsEditEntityDialogOpen(isEditEntityDialogOpen: boolean): void;
}

const drawerWidth = 240;

function Entities(props: EntitiesProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <div className={styles['entitiesContainer']}>
        <EntitiesList
          entityType={props.entityType}
          entities={props.entities}
        ></EntitiesList>
        <div className={styles['entityContainer']}>
          <Entity
            isEditDialogOpen={props.isEditEntityDialogOpen}
            setIsEditDialogOpen={props.setIsEditEntityDialogOpen}
          ></Entity>
        </div>
      </div>
    </Box>
  );
}

export default Entities;
