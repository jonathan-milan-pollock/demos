import { ReduxActionType } from 'src/enums/ReduxActionType';
import { ThemeType } from 'src/enums/ThemeType';
import { ReduxChangeThemeAction } from 'src/store/ReduxChangeThemeAction';

export function changeTheme(themeType: ThemeType): ReduxChangeThemeAction {
    return {
        type: ReduxActionType.CHANGE_THEME,
        payload: { themeType: themeType }
    };
}
