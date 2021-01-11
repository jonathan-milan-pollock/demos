import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGoogle,
  faFacebookSquare,
  faFacebookF,
  faLinkedin,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faHome,
  faEdit,
  faInfoCircle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBookOpen,
  faVrCardboard,
  faCheckSquare,
  faSquare,
  faEllipsisV,
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faCameraAlt,
  faCameraRetro,
  faArrowAltDown,
  faDrone,
} from '@fortawesome/pro-solid-svg-icons';

export const addFontAwesomeIcons = () => {
  library.add(faGoogle);
  library.add(faFacebookSquare);
  library.add(faFacebookF);
  library.add(faLinkedin);
  library.add(faInstagram);
  library.add(faYoutube);
  library.add(faCalendar);
  library.add(faHome);
  library.add(faEdit);
  library.add(faInfoCircle);
  library.add(faWindowClose);
  library.add(faChevronLeft);
  library.add(faChevronRight);
  library.add(faBookOpen);
  library.add(faVrCardboard);
  library.add(faCheckSquare);
  library.add(faSquare);
  library.add(faEllipsisV);
  library.add(faCameraAlt);
  library.add(faCameraRetro);
  library.add(faArrowAltDown);
  library.add(faDrone);
  library.add(faPlay);
  library.add(faPause);
};
