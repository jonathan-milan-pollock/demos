import React from 'react';

import { useWindowSize } from 'react-use';

import Layout from '../components/Layout';
import { makeStyles, Theme } from '@material-ui/core';
import FontAwesomeIconEm from '../components/FontAwesomeIconEm';
import AppUiConstants from '../constants/app-ui-constants';

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      marginTop: 0,
    },
  };
});

const IndexPage = () => {
  const classes = useStyles();
  const windowSize = useWindowSize();

  const imageNumbers = [];
  for (let i = 0; i !== 37; i++) {
    imageNumbers.push(i + 1);
  }

  const images = imageNumbers.map((imageNumber) => {
    return {
      thumbnailSrc: `https://dark-rush-photography-images.azureedge.net/dark-rush-photography-content/home-page/fill/home-page-${imageNumber}.jpg`,
      imageSrc: `https://dark-rush-photography-images.azureedge.net/dark-rush-photography-content/home-page/small/home-page-${imageNumber}.jpg`,
      large: `https://dark-rush-photography-images.azureedge.net/dark-rush-photography-content/home-page/large/home-page-${imageNumber}.jpg`,
    };
  });

  const galleryHeight =
    windowSize.height -
    AppUiConstants.TOP_NAVIGATION_BAR_HEIGHT -
    AppUiConstants.BOTTOM_NAVIGATION_BAR_HEIGHT -
    72;

  return (
    <Layout>
      <div className={classes.container}>
        <drp-slide-gallery
          images={`${JSON.stringify(images)}`}
          autoPlay={true}
          height={`${galleryHeight}px`}
        >
          <div slot="previous-icon">
            <FontAwesomeIconEm
              widthInEm={1}
              icon={{ prefix: 'far', iconName: 'chevron-left' }}
            />
          </div>
          <div slot="next-icon">
            <FontAwesomeIconEm
              widthInEm={1}
              icon={{ prefix: 'far', iconName: 'chevron-right' }}
            />
          </div>
          <div slot="play-icon">
            <FontAwesomeIconEm
              widthInEm={1.5}
              icon={{ prefix: 'far', iconName: 'play' }}
            />
          </div>
          <div slot="pause-icon">
            <FontAwesomeIconEm
              widthInEm={1.5}
              icon={{ prefix: 'far', iconName: 'pause' }}
            />
          </div>
        </drp-slide-gallery>
      </div>
    </Layout>
  );
};

export default IndexPage;
