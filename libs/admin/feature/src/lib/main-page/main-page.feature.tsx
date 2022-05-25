import { useState } from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box } from '@mui/material';

import styles from './main-page.module.scss';
import { EntityType } from '@dark-rush-photography/shared/types';
import {
  Entities,
  EntityTypesDrawer,
  TitleBar,
} from '@dark-rush-photography/admin/ui';

const drawerWidth = 240;

export interface MainPageProps {
  entityType: EntityType;
  year?: string;
}

export default withPageAuthRequired(function MainPage(props: MainPageProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditEntityDialogOpen, setIsEditEntityDialogOpen] = useState(false);

  const entityTypeLinks = [
    {
      pathname: '/about',
      title: 'About',
    },
    {
      pathname: '/best-of',
      title: 'Best Of',
    },
    {
      pathname: '/destinations',
      title: 'Destinations',
    },
    {
      pathname: '/favorites',
      title: 'Favorites',
    },
    {
      pathname: '/reviews',
      title: 'Reviews',
    },
    {
      pathname: '/review-media',
      title: 'Review Media',
    },
    {
      pathname: '/image-videos',
      title: 'Image Videos',
    },
  ];

  const entities = [
    { pathname: 'dark-rush', imageUrl: 'https://picsum.photos/80/80' },
    { pathname: 'milan-pollock', imageUrl: 'https://picsum.photos/80/80' },
  ];

  return (
    <Box className={styles['outerContainer']}>
      <TitleBar
        entityType={props.entityType}
        year={props.year}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      ></TitleBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
        aria-label="entity types"
      >
        <EntityTypesDrawer
          entityTypeLinks={entityTypeLinks}
          eventGroups={['2023', '2022', '2021', '2020', '2019']}
          photoOfTheWeekGroups={['2023', '2022', '2021', '2020', '2019']}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          changePage={() => {
            console.log('change page');
          }}
        ></EntityTypesDrawer>
      </Box>
      <Entities
        entityType={props.entityType}
        entities={entities}
        isDrawerOpen={isDrawerOpen}
        isEditEntityDialogOpen={isEditEntityDialogOpen}
        setIsEditEntityDialogOpen={setIsEditEntityDialogOpen}
      ></Entities>
    </Box>
  );
});
