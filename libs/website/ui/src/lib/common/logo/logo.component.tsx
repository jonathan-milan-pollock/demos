import { Fade } from '@mui/material';

import styles from './logo.module.scss';
import { Application } from '@dark-rush-photography/website/types';
import {
  findBrowserHasColorScrollbar,
  findCacheBustingUrl,
} from '@dark-rush-photography/website/util';
import PhoneKeypadNumber from '../phone-keypad-number/phone-keypad-number.component';
import PhoneNumber from '../phone-number/phone-number.component';
import EmailAddress from '../email-address/email-address.component';

interface Props {
  isSmallPage: boolean;
  width: number | string;
}

export default function Logo(props: Props): JSX.Element {
  return (
    <div
      className={
        findBrowserHasColorScrollbar()
          ? `${styles['outerContainer']} ${styles['outerContainerWithColorScrollbar']}`
          : styles['outerContainer']
      }
    >
      <Fade in={true} timeout={{ enter: 700 }}>
        <div>
          <div className={styles['logoContainer']}>
            <img
              className={styles['image']}
              alt="Dark Rush Photography Logo"
              src={findCacheBustingUrl(Application.LOGO_URL)}
            />
            <div className={styles['contactContainer']}>
              <PhoneNumber className={styles['contact']} />
            </div>
            <div className={styles['contactContainer']}>
              <PhoneKeypadNumber className={styles['contact']} />
            </div>
            <div className={styles['contactContainer']}>
              <EmailAddress className={styles['contact']} />
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
