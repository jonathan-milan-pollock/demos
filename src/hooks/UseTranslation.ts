import { useState, useEffect } from 'react';

import detectBrowserLanguage from 'detect-browser-language';

import Translation from 'src/models/Translation';
import { loadTranslation } from 'src/utils/Translation';

export function useTranslation(): Translation {
    const [translation, setTranslation] = useState<Translation>(
        loadTranslation('en')
    );

    const browserLanguage = detectBrowserLanguage();
    useEffect(() => {
        if (browserLanguage.startsWith('en')) {
            setTranslation(loadTranslation('en'));
        }
    }, [browserLanguage]);

    return translation;
}
