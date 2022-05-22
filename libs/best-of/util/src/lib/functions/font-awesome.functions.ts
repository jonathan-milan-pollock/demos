import { IconDefinition, IconPack } from '@fortawesome/fontawesome-svg-core';
import {
  faGoogle,
  faFacebookSquare,
  faFacebookF,
  faLinkedin,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCaretSquareLeft,
  faCalendar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faHome,
  faEdit,
  faInfoCircle,
  faWindowClose,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBookOpen,
  faVrCardboard,
  faCheckSquare,
  faSquare,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faCameraAlt,
  faCameraRetro,
  faArrowAltDown,
  faDrone,
} from '@fortawesome/pro-solid-svg-icons';

export const loadFontAwesomeIcons = (): Array<IconDefinition | IconPack> => {
  const icons: Array<IconDefinition | IconPack> = [];
  icons.push(faGoogle);
  icons.push(faFacebookSquare);
  icons.push(faFacebookF);
  icons.push(faLinkedin);
  icons.push(faInstagram);
  icons.push(faYoutube);
  icons.push(faCaretSquareLeft);
  icons.push(faCalendar);
  icons.push(faHome);
  icons.push(faEdit);
  icons.push(faInfoCircle);
  icons.push(faWindowClose);
  icons.push(faChevronLeft);
  icons.push(faChevronRight);
  icons.push(faBookOpen);
  icons.push(faVrCardboard);
  icons.push(faCheckSquare);
  icons.push(faSquare);
  icons.push(faCameraAlt);
  icons.push(faCameraRetro);
  icons.push(faArrowAltDown);
  icons.push(faDrone);
  return icons;
};
