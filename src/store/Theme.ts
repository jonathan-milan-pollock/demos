import { ThemeType } from 'src/enums/ThemeType';
import ReduxAction, { ReduxActionType } from './ReduxAction';

const initialState: ReduxThemeState = {
    themeType: ThemeType.Light
};

export interface ReduxThemeTypePayload {
    themeType: ThemeType;
}

export interface ReduxChangeThemeAction extends ReduxAction {
    type: ReduxActionType.CHANGE_THEME;
    payload: ReduxThemeTypePayload;
}

export function changeTheme(themeType: ThemeType): ReduxChangeThemeAction {
    return {
        type: ReduxActionType.CHANGE_THEME,
        payload: { themeType: themeType }
    };
}

export interface ReduxThemeState {
    themeType: ThemeType;
}

type TThemeReducerActions = ReduxChangeThemeAction;
export default function(
    state: ReduxThemeState = initialState,
    action: TThemeReducerActions
) {
    switch (action.type) {
        case ReduxActionType.CHANGE_THEME:
            return { ...state, themeType: action.payload.themeType };
        default:
            return state;
    }
}
