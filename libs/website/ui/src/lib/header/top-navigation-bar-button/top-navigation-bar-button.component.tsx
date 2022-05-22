import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from './top-navigation-bar-button.module.scss';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconProp;
  text: string;
  buttonPathname: string;
  buttonPathnames: string[];
  isDisplayed: boolean;
}

TopNavigationBarButton.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  buttonPathname: PropTypes.string.isRequired,
  buttonPathnames: PropTypes.array.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
};

export default function TopNavigationBarButton({
  icon,
  text,
  buttonPathname,
  buttonPathnames,
  isDisplayed,
}: Props): JSX.Element {
  const router = useRouter();

  const isSelected = buttonPathnames.includes(router.pathname);
  return (
    <span
      className={styles['container']}
      style={!isDisplayed ? { display: 'none' } : {}}
    >
      <Button
        className={isSelected ? styles['buttonSelected'] : styles['button']}
        onClick={() => router.push(buttonPathname)}
        data-testid={
          isSelected
            ? 'top-navigation-bar-button-selected'
            : 'top-navigation-bar-button'
        }
      >
        <FontAwesomeIcon className={styles['icon']} icon={icon} size="lg" />
        <span className={styles['buttonText']}>{text}</span>
      </Button>
    </span>
  );
}
