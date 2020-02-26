import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as Theme from 'src/store/Theme';

const reducers = {
    theme: Theme.reducer
};

const rootReducer = combineReducers({
    ...reducers
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middleware = [thunk];

    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middleware))
    );
}
