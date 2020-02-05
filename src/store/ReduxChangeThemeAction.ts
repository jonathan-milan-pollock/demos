import { ReduxActionType } from 'src/enums/ReduxActionType';
import ReduxThemeTypePayload from 'src/store/ReduxThemeTypePayload';
import ReduxBaseAction from 'src/store/ReduxBaseAction';

export interface ReduxChangeThemeAction extends ReduxBaseAction {
    type: ReduxActionType.CHANGE_THEME;
    payload: ReduxThemeTypePayload;
}
