import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { BrowserWindow } from '@dark-rush-photography/website/types';
import styles from './social-media-bar-button.module.scss';

interface Props {
  icon: IconProp;
  url: string;
  openInBrowserWindow(window: BrowserWindow, url: string): string;
}

export default function SocialMediaBarButton({
  icon,
  url,
  openInBrowserWindow,
}: Props): JSX.Element {
  return (
    <IconButton
      className={styles['iconButton']}
      onClick={() => openInBrowserWindow(window as BrowserWindow, url)}
      data-testid="social-media-bar-button"
    >
      <FontAwesomeIcon className={styles['icon']} icon={icon} size="sm" />
    </IconButton>
  );
}
