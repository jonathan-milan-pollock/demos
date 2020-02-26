import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';

import { loadFontAwesomeIcons } from 'src/utils/FontAwesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import Theme from 'src/models/Theme';

interface Props {
    renderItem: JSX.Element;
}

AppStub.propTypes = {
    renderItem: PropTypes.node.isRequired
};

export default function AppStub({ renderItem }: Props): JSX.Element {
    library.add(...loadFontAwesomeIcons());
    const muiTheme = createMuiTheme({
        palette: {
            custom: {} as Theme
        }
    });

    return (
        <MuiThemeProvider theme={muiTheme}>
            <MemoryRouter>{renderItem}</MemoryRouter>
        </MuiThemeProvider>
    );
}
