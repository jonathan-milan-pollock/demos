import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-solid-svg-icons';

import styles from './title-bar.module.scss';
import { EntityType } from '@dark-rush-photography/shared/types';

interface TitleBarProps {
  entityType: EntityType;
  year?: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen(isDrawerOpen: boolean): void;
}

const drawerWidth = 240;

const getTitle = (entityType: EntityType, year?: string): string => {
  let entityTypeTitle = '';
  switch (entityType) {
    case EntityType.About:
      entityTypeTitle = 'About';
      break;
    case EntityType.BestOf:
      entityTypeTitle = 'Best Of';
      break;
    case EntityType.Destination:
      entityTypeTitle = 'Destinations';
      break;
    case EntityType.Event:
      entityTypeTitle = `Events${year ? ' ' + year : ' '}`;
      break;
    case EntityType.Favorites:
      entityTypeTitle = 'Favorites';
      break;
    case EntityType.ImagePost:
      entityTypeTitle = 'Image Posts';
      break;
    case EntityType.ImageVideo:
      entityTypeTitle = 'Image Videos';
      break;
    case EntityType.PhotoOfTheWeek:
      entityTypeTitle = `Photo of the Week${year ? ' ' + year : ' '}`;
      break;
    case EntityType.Review:
      entityTypeTitle = 'Reviews';
      break;
    case EntityType.ReviewMedia:
      entityTypeTitle = 'Review Media';
      break;
  }
  return entityTypeTitle;
};

function TitleBar(props: TitleBarProps) {
  const handleDrawerToggle = () => {
    props.setIsDrawerOpen(!props.isDrawerOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          md: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          md: `${drawerWidth}px`,
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <FontAwesomeIcon icon={faBars} />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {getTitle(props.entityType)}
        </Typography>
        <div className={styles['logOutButton']}>
          <Button color="inherit" href="/api/auth/logout">
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;
