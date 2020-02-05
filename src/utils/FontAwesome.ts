import { IconDefinition, IconPack } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export const loadFontAwesomeIcons = (): Array<IconDefinition | IconPack> => {
    const icons: Array<IconDefinition | IconPack> = [];
    icons.push(faCheckSquare);
    icons.push(faSquare);
    icons.push(faHome);
    icons.push(faInfoCircle);
    return icons;
};
