import React from 'react';

import { AppBar, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';

import styles from './image-display-mode-bar.module.scss';

function ImageDisplayModeBar(): JSX.Element {
  const [imageDisplay, setImageDisplay] = React.useState('carousel');
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newImageDisplay: string
  ) => {
    setImageDisplay(newImageDisplay);
  };

  return (
    <AppBar position="static">
      <Paper>
        <div className={styles['container']}>
          <ToggleButtonGroup
            color="primary"
            value={imageDisplay}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="carousel">
              <FontAwesomeIcon icon={faPlay} />
              <span className={styles['toggleButtonText']}>Carousel</span>
            </ToggleButton>
            <ToggleButton value="grid">
              <FontAwesomeIcon icon={faGripHorizontal} />
              <span className={styles['toggleButtonText']}>Grid</span>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Paper>
    </AppBar>
  );
}

export default ImageDisplayModeBar;
