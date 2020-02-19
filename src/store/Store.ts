import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import theme from 'src/store/Theme';

const reducers = {
    theme
};

const rootReducer = combineReducers({
    ...reducers
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default function ConfigureStore() {
    const middleware = [thunk];

    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middleware))
    );
}
