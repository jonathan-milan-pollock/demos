import { Grid } from '@mui/material';

import { SocialMediaUrl } from '@dark-rush-photography/website/types';
import { openInBrowserWindow } from '@dark-rush-photography/website/util';
import SocialMediaBarButton from '../social-media-bar-button/social-media-bar-button.component';
import styles from './social-media-bar.module.scss';

interface Props {
  isDisplayed: boolean;
}

export default function SocialMediaBar({ isDisplayed }: Props): JSX.Element {
  return (
    <Grid
      container
      className={styles['outerContainer']}
      data-testid="social-media-bar"
    >
      <Grid item xs={3} className={styles['container']}></Grid>
      <Grid item xs={6} className={styles['container']}>
        <SocialMediaBarButton
          icon={{ prefix: 'fab', iconName: 'facebook-square' }}
          url={SocialMediaUrl.FACEBOOK}
          openInBrowserWindow={openInBrowserWindow}
        />
        <SocialMediaBarButton
          icon={{ prefix: 'fab', iconName: 'instagram' }}
          url={SocialMediaUrl.INSTAGRAM}
          openInBrowserWindow={openInBrowserWindow}
        />
        <SocialMediaBarButton
          icon={{ prefix: 'fab', iconName: 'linkedin' }}
          url={SocialMediaUrl.LINKEDIN}
          openInBrowserWindow={openInBrowserWindow}
        />
        <SocialMediaBarButton
          icon={{ prefix: 'fab', iconName: 'youtube' }}
          url={SocialMediaUrl.YOUTUBE}
          openInBrowserWindow={openInBrowserWindow}
        />
      </Grid>
      <Grid item xs={3} className={styles['container']}></Grid>
    </Grid>
  );
}
