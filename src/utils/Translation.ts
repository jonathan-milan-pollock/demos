import Translation from 'src/models/Translation';
import { enTranslation } from 'src/translations/en';

export const loadTranslation = (locale: string): Translation => {
    if (locale === 'en') return enTranslation;
    return enTranslation;
};
