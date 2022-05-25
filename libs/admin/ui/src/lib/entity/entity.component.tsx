import { EntityType } from '@dark-rush-photography/shared/types';
import { Button, Toolbar, Typography } from '@mui/material';
import EditEntityDialog from '../edit-entity-dialog/edit-entity-dialog.component';
import styles from './entity.module.scss';

export interface EntityProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen(isEditDialogOpen: boolean): void;
}

function Entity(props: EntityProps) {
  const editHandler = () => {
    props.setIsEditDialogOpen(true);
  };

  return (
    <div className={styles['entityContainer']}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          dark-rush
        </Typography>
        <div className={styles['editButton']}>
          <Button color="inherit" onClick={editHandler}>
            Edit
          </Button>
        </div>
      </Toolbar>
      <EditEntityDialog
        entityType={EntityType.About}
        pathname="dark-rush"
        isDialogOpen={props.isEditDialogOpen}
        setIsDialogOpen={props.setIsEditDialogOpen}
      ></EditEntityDialog>
    </div>
  );
}

export default Entity;
