import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Fade } from '@mui/material';

import { Application } from '@dark-rush-photography/website/types';
import { findBrowserHasColorScrollbar } from '@dark-rush-photography/best-of/util';
import ColorScrollbar from '../color-scrollbar/color-scrollbar.component';
import styles from './scrollbar-content.module.scss';

interface Props {
  top: number;
  width: number;
  height: number;
  marginLeft: number;
  className?: string;
  renderItem: JSX.Element;
}

ScrollbarContent.propTypes = {
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  className: PropTypes.string,
  renderItem: PropTypes.node.isRequired,
};

/*
          <Fade in={true} timeout={{ enter: Application.FADE_TIME }}>
            <ColorScrollbar>{renderItem}</ColorScrollbar>
          </Fade>
           */
export default function ScrollbarContent({
  top,
  width,
  height,
  marginLeft,
  className,
  renderItem,
}: Props): JSX.Element {
  const renderContent = () => {
    if (findBrowserHasColorScrollbar()) {
      let scrollbarClassName = styles['scrollbar'];
      if (className) {
        scrollbarClassName = `${styles['scrollbar']} ${styles[className]}`;
      }
      return (
        <div className={scrollbarClassName}>
          <Fade in={true} timeout={{ enter: Application.FADE_TIME }}>
            <div data-testid="scrollbar">{renderItem}</div>
          </Fade>
        </div>
      );
    } else {
      let scrollbarClassName = styles['colorScrollbar'];
      if (className) {
        scrollbarClassName = `${styles['colorScrollbar']} ${styles[className]}`;
      }
      return <div className={scrollbarClassName}></div>;
    }
  };

  return <Fragment>{renderContent()}</Fragment>;
}
