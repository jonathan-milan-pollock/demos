import React from 'react';

import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import classes from './image-display-mode-bar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';

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
        <div className={classes.container}>
          <ToggleButtonGroup
            color="primary"
            value={imageDisplay}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="carousel">
              <FontAwesomeIcon icon={faPlay} />
              <span className={classes.toggleButtonText}>Carousel</span>
            </ToggleButton>
            <ToggleButton value="grid">
              <FontAwesomeIcon icon={faGripHorizontal} />
              <span className={classes.toggleButtonText}>Grid</span>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Paper>
    </AppBar>
  );
}

export default ImageDisplayModeBar;
