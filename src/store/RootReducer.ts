import { combineReducers } from 'redux';
import theme from 'src/store/ThemeReducer';

const rootReducer = combineReducers({
    theme
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;
