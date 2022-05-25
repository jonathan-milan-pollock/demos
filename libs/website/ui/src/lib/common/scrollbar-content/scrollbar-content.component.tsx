import { Fragment } from 'react';

import { Fade } from '@mui/material';

import { Application } from '@dark-rush-photography/website/types';
import { findBrowserHasColorScrollbar } from '@dark-rush-photography/website/util';
import ColorScrollbar from '../color-scrollbar/color-scrollbar.component';
import styles from './scrollbar-content.module.scss';

interface Props {
  top: number;
  width: number;
  height: number;
  marginLeft: number;
  className?: string;
  children?: React.ReactNode;
}

/*
          <Fade in={true} timeout={{ enter: Application.FADE_TIME }}>
            <ColorScrollbar>{props.children}</ColorScrollbar>
          </Fade>
           */
export default function ScrollbarContent(props: Props): JSX.Element {
  const renderContent = () => {
    if (findBrowserHasColorScrollbar()) {
      let scrollbarClassName = styles['scrollbar'];
      if (props.className) {
        scrollbarClassName = `${styles['scrollbar']} ${
          styles[props.className]
        }`;
      }
      return (
        <div className={scrollbarClassName}>
          <Fade in={true} timeout={{ enter: Application.FADE_TIME }}>
            <div data-testid="scrollbar">{props.children}</div>
          </Fade>
        </div>
      );
    } else {
      let scrollbarClassName = styles['colorScrollbar'];
      if (props.className) {
        scrollbarClassName = `${styles['colorScrollbar']} ${
          styles[props.className]
        }`;
      }
      return <div className={scrollbarClassName}></div>;
    }
  };

  return <Fragment>{renderContent()}</Fragment>;
}
