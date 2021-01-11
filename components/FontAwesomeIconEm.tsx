import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  icon: IconProp;
  widthInEm: number;
};

const FontAwesomeIconEm = ({ icon, widthInEm }: Props) => {
  return <FontAwesomeIcon style={{ width: `${widthInEm}em` }} icon={icon} />;
};

export default FontAwesomeIconEm;
