import { ThemeType } from 'src/enums/ThemeType';
import { ReduxActionType } from 'src/enums/ReduxActionType';
import { ReduxThemeState } from 'src/store/ReduxThemeState';
import { ReduxChangeThemeAction } from 'src/store/ReduxChangeThemeAction';

const initialState: ReduxThemeState = {
    themeType: ThemeType.Light
};

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
