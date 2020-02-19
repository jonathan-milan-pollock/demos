import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import 'typeface-raleway';

import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

import * as serviceWorker from './serviceWorker';
import ConfigureStore from 'src/store/Store';

const store = ConfigureStore();

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
