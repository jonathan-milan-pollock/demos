import { useRouter } from 'next/router';

import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './title-bar-back-button.module.scss';

interface Props {
  goBackToPathname: string | null;
  isDisplayed: boolean;
}

export default function TitleBarBackButton({
  goBackToPathname,
  isDisplayed,
}: Props): JSX.Element {
  const router = useRouter();
  return (
    <IconButton
      className={styles['iconButton']}
      style={!isDisplayed ? { visibility: 'hidden' } : {}}
      onClick={() => {
        if (goBackToPathname) router.push(goBackToPathname);
      }}
      data-testid="title-bar-back-button"
    >
      <FontAwesomeIcon
        className={styles['icon']}
        icon={{ prefix: 'far', iconName: 'caret-square-left' }}
        size="1x"
      />
    </IconButton>
  );
}
