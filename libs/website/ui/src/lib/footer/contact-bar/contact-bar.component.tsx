import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

import { findYear } from '@dark-rush-photography/best-of/util';
import EmailAddress from '../../common/email-address/email-address.component';
import PhoneNumber from '../../common/phone-number/phone-number.component';
import styles from './contact-bar.module.scss';

interface Props {
  isPhoneNumberDisplayed: boolean;
  isCopyrightDisplayed: boolean;
  isEmailDisplayed: boolean;
}

ContactBar.propTypes = {
  isPhoneNumberDisplayed: PropTypes.bool.isRequired,
  isCopyrightDisplayed: PropTypes.bool.isRequired,
  isEmailDisplayed: PropTypes.bool.isRequired,
};

export default function ContactBar({
  isPhoneNumberDisplayed,
  isCopyrightDisplayed,
  isEmailDisplayed,
}: Props) {
  const phoneNumberAndEmailColumnSize = !isCopyrightDisplayed ? 6 : 3;
  const copyrightColumnSize =
    isPhoneNumberDisplayed || isEmailDisplayed ? 6 : 12;

  const renderPhoneNumber = () => {
    if (!isPhoneNumberDisplayed) return <></>;

    return (
      <Grid
        item
        xs={phoneNumberAndEmailColumnSize}
        className={styles['phoneNumberContainer']}
        data-testid="contact-bar-phone-number"
      >
        <PhoneNumber />
      </Grid>
    );
  };

  const renderCopyright = () => {
    if (!isCopyrightDisplayed) return <></>;

    return (
      <Grid
        item
        xs={copyrightColumnSize}
        className={styles['copyrightContainer']}
        data-testid="contact-bar-copyright"
      >
        <div className={styles['copyright']}>
          <span className={styles['copyrightText']}>
            &copy; {findYear()} Dark Rush&nbsp;
          </span>
          <sup className={styles['copyrightSymbol']}>&#174;</sup>
          <span className={styles['copyrightText']}>&nbsp;Photography</span>
        </div>
      </Grid>
    );
  };

  const renderEmail = () => {
    if (!isEmailDisplayed) return <></>;

    return (
      <Grid
        item
        xs={phoneNumberAndEmailColumnSize}
        className={styles['emailAddressContainer']}
        data-testid="contact-bar-email"
      >
        <EmailAddress />
      </Grid>
    );
  };
  return (
    <Grid container className={styles['container']}>
      {renderPhoneNumber()}
      {renderCopyright()}
      {renderEmail()}
    </Grid>
  );
}
