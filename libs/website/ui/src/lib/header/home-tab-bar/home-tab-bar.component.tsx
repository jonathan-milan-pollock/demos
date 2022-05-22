import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AppBar, Paper, Tab, Tabs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  ApplicationLayout,
  Layout,
  SubPageType,
} from '@dark-rush-photography/website/types';
import styles from './home-tab-bar.module.scss';

interface Props {
  layout: Layout;
}

HomeTabBar.propTypes = {
  layout: PropTypes.object.isRequired,
};

export default function HomeTabBar({ layout }: Props): JSX.Element {
  const router = useRouter();
  const [currentPageType, setCurrentPageType] = useState(() => {
    switch (router.pathname) {
      case '/stories':
      case '/stories/':
        return SubPageType.Stories;
      case '/photo-of-the-week':
      case '/photo-of-the-week/':
        return SubPageType.WeeklyPhotos;
      case '/extended-reality-studio':
        return SubPageType.ExtendedRealityStudio;
      default:
        return SubPageType.BestOfImages;
    }
  });

  const handleChange = (_event: React.ChangeEvent<any>, newValue: number) => {
    setCurrentPageType(newValue);
    switch (newValue) {
      case SubPageType.BestOfImages:
        router.push('/');
        break;
      case SubPageType.Stories:
        router.push('/stories');
        break;
      case SubPageType.WeeklyPhotos:
        router.push('/photo-of-the-week');
        break;
      case SubPageType.ExtendedRealityStudio:
        router.push('/extended-reality-studio');
        break;
    }
  };

  if (layout.width < ApplicationLayout.HOME_TAB_BAR_MIN_WIDTH) {
    return (
      <AppBar position="static">
        <Paper>
          <Tabs
            value={currentPageType}
            onChange={handleChange}
            className={styles['tabs']}
            classes={{
              indicator: styles['tabIndicator'],
            }}
            variant="fullWidth"
          >
            <Tab
              className={
                router.pathname === '/' ? styles['tabSelected'] : styles['tab']
              }
              label="PHOTOS"
              value={SubPageType.BestOfImages}
              icon={
                <FontAwesomeIcon
                  icon={{
                    prefix: 'fas',
                    iconName: 'camera-alt',
                  }}
                  size="lg"
                />
              }
            />
            <Tab
              className={
                router.pathname === '/stories' ||
                router.pathname === `/stories/`
                  ? styles['tabSelected']
                  : styles['tab']
              }
              label="STORIES"
              value={SubPageType.Stories}
              icon={
                <FontAwesomeIcon
                  icon={{
                    prefix: 'far',
                    iconName: 'book-open',
                  }}
                  size="lg"
                />
              }
            />
            <Tab
              className={
                router.pathname === '/photo-of-the-week' ||
                router.pathname === '/photo-of-the-week/'
                  ? styles['tabSelected']
                  : styles['tab']
              }
              label="WEEKLY PHOTO"
              value={SubPageType.WeeklyPhotos}
              icon={
                <FontAwesomeIcon
                  icon={{
                    prefix: 'far',
                    iconName: 'calendar',
                  }}
                  size="lg"
                />
              }
            />
            <Tab
              className={
                router.pathname === '/extended-reality-studio' ||
                router.pathname === '/extended-reality-studio/'
                  ? styles['tabSelected']
                  : styles['tab']
              }
              label="Destinations"
              value={SubPageType.ExtendedRealityStudio}
              icon={
                <FontAwesomeIcon
                  icon={{
                    prefix: 'far',
                    iconName: 'vr-cardboard',
                  }}
                  size="lg"
                />
              }
            />
          </Tabs>
        </Paper>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Paper>
        <Tabs
          value={currentPageType}
          onChange={handleChange}
          className={styles['tabs']}
          classes={{
            indicator: styles['tabIndicator'],
          }}
          centered
        >
          <Tab
            className={
              router.pathname === '/' ? styles['tabSelected'] : styles['tab']
            }
            label="PHOTOS"
            value={SubPageType.BestOfImages}
            icon={
              <FontAwesomeIcon
                icon={{
                  prefix: 'fas',
                  iconName: 'camera-alt',
                }}
                size="lg"
              />
            }
          />
          <Tab
            className={
              router.pathname === '/stories' || router.pathname === `/stories/`
                ? styles['tabSelected']
                : styles['tab']
            }
            label="STORIES"
            value={SubPageType.Stories}
            icon={
              <FontAwesomeIcon
                icon={{
                  prefix: 'far',
                  iconName: 'book-open',
                }}
                size="lg"
              />
            }
          />
          <Tab
            className={
              router.pathname === '/photo-of-the-week' ||
              router.pathname === '/photo-of-the-week/'
                ? styles['tabSelected']
                : styles['tab']
            }
            label="PHOTO OF THE WEEK"
            value={SubPageType.WeeklyPhotos}
            icon={
              <FontAwesomeIcon
                icon={{
                  prefix: 'far',
                  iconName: 'calendar',
                }}
                size="lg"
              />
            }
          />
          <Tab
            className={
              router.pathname === '/extended-reality-studio' ||
              router.pathname === '/extended-reality-studio/'
                ? styles['tabSelected']
                : styles['tab']
            }
            label="DESTINATIONS"
            value={SubPageType.ExtendedRealityStudio}
            icon={
              <FontAwesomeIcon
                icon={{
                  prefix: 'far',
                  iconName: 'vr-cardboard',
                }}
                size="lg"
              />
            }
          />
        </Tabs>
      </Paper>
    </AppBar>
  );
}
