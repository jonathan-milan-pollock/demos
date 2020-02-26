import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { loadFontAwesomeIcons } from 'src/utils/FontAwesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import { ThemeType } from 'src/enums/ThemeType';
import Theme from 'src/models/Theme';

interface Props {
    renderItem: JSX.Element;
}

AppReduxStub.propTypes = {
    renderItem: PropTypes.node.isRequired
};

export default function AppReduxStub({ renderItem }: Props): JSX.Element {
    library.add(...loadFontAwesomeIcons());
    const muiTheme = createMuiTheme({
        palette: {
            custom: {} as Theme
        }
    });

    const mockStore = configureStore([]);
    const initialState = { theme: { themeType: ThemeType.Dark } };
    return (
        <Provider store={mockStore(initialState)}>
            <MuiThemeProvider theme={muiTheme}>
                <MemoryRouter>{renderItem}</MemoryRouter>
            </MuiThemeProvider>
        </Provider>
    );
}
