import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/pro-solid-svg-icons';

import styles from './entity-types-drawer.module.scss';
import { EntityType } from '@dark-rush-photography/shared/types';

interface EntityTypesDrawerProps {
  entityTypeLinks: { pathname: string; title: string }[];
  eventGroups: string[];
  photoOfTheWeekGroups: string[];
  isDrawerOpen: boolean;
  setIsDrawerOpen(isDrawerOpen: boolean): void;
  changePage(entityType: EntityType): void;
}

const drawerWidth = 240;

function EntityTypesDrawer(props: EntityTypesDrawerProps) {
  const router = useRouter();
  const [openEvents, setOpenEvents] = useState(false);
  const [openPhotoOfTheWeek, setOpenPhotoOfTheWeek] = useState(false);

  const toggleDrawerHandler = () => {
    props.setIsDrawerOpen(!props.isDrawerOpen);
  };

  const eventsClickHandler = () => {
    setOpenEvents(!openEvents);
  };

  const photoOfTheWeekClickHandler = () => {
    setOpenPhotoOfTheWeek(!openPhotoOfTheWeek);
  };

  return (
    <Drawer
      variant={props.isDrawerOpen ? 'temporary' : 'permanent'}
      open={props.isDrawerOpen}
      onClose={toggleDrawerHandler}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: props.isDrawerOpen
          ? { xs: 'block', sm: 'block', md: 'none' }
          : { xs: 'none', sm: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          bgcolor: 'transparent',
        },
      }}
    >
      <div className={styles['drawerContainer']}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Entity Types
          </Typography>
        </Toolbar>
        <Divider />
        <List className={styles['list']}>
          <ListItemButton
            className={styles['listItem']}
            selected={router.pathname === '/image-posts'}
            onClick={() => router.push('/image-posts')}
          >
            <ListItemText primary="Image Posts" />
          </ListItemButton>
          <Divider />
          {props.entityTypeLinks.map((entityTypeLink) => (
            <ListItemButton
              className={styles['listItem']}
              selected={router.pathname === entityTypeLink.pathname}
              onClick={() => router.push(entityTypeLink.pathname)}
            >
              <ListItemText primary={entityTypeLink.title} />
            </ListItemButton>
          ))}
          <ListItemButton onClick={eventsClickHandler}>
            <ListItemText primary="Events" />
            {openEvents ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </ListItemButton>
          <Collapse in={openEvents} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {props.eventGroups.map((eventGroup) => (
                <ListItemButton
                  key={eventGroup}
                  sx={{ pl: 4 }}
                  selected={router.pathname === `/events/${eventGroup}`}
                  onClick={() => router.push(`/events/${eventGroup}`)}
                >
                  <ListItemText primary={eventGroup} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={photoOfTheWeekClickHandler}>
            <ListItemText primary="Photo of the Week" />
            {openPhotoOfTheWeek ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </ListItemButton>
          <Collapse in={openPhotoOfTheWeek} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {props.photoOfTheWeekGroups.map((photoOfTheWeekGroup) => (
                <ListItemButton
                  key={photoOfTheWeekGroup}
                  sx={{ pl: 4 }}
                  selected={
                    router.pathname ===
                    `/photo-of-the-week/${photoOfTheWeekGroup}`
                  }
                  onClick={() =>
                    router.push(`/photo-of-the-week/${photoOfTheWeekGroup}`)
                  }
                >
                  <ListItemText primary={photoOfTheWeekGroup} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    </Drawer>
  );
}

export default EntityTypesDrawer;
