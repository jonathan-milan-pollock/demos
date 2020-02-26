import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import App from '../App';
import { ThemeType } from 'src/enums/ThemeType';

it('renders without crashing', () => {
    const mockStore = configureStore([]);
    const initialState = { theme: { themeType: ThemeType.Dark } };

    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={mockStore(initialState)}>
            <App />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
