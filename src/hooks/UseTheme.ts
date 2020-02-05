import { useState, useEffect } from 'react';

import { ThemeType } from 'src/enums/ThemeType';
import Theme from 'src/models/Theme';
import { loadTheme } from 'src/utils/Theme';

export function useTheme(themeType: ThemeType): Theme {
    const [theme, setTheme] = useState<Theme>(loadTheme(ThemeType.Dark));

    useEffect(() => {
        setTheme(loadTheme(themeType));
    }, [themeType]);

    return theme;
}
