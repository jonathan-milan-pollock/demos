import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';

import { library } from '@fortawesome/fontawesome-svg-core';
import { loadFontAwesomeIcons } from 'src/utils/FontAwesome';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { PageType } from 'src/enums/PageType';
import { findPagePathname } from 'src/utils/Page';
import { useTheme } from 'src/hooks/UseTheme';
import { ReduxState } from 'src/store/Store';
import Home from 'src/pages/Home';
import AboutPage from 'src/pages/About';

function App({ themeType }: any): JSX.Element {
    library.add(...loadFontAwesomeIcons());
    const theme = useTheme(themeType);
    const muiTheme = createMuiTheme({
        palette: {
            custom: theme
        }
    });
    return (
        <HelmetProvider>
            <MuiThemeProvider theme={muiTheme}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path={findPagePathname(PageType.Home)}
                            component={Home}
                        />
                        <Route
                            exact
                            path={findPagePathname(PageType.About)}
                            component={AboutPage}
                        />
                        <Route component={Home} />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        </HelmetProvider>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    themeType: state.theme.themeType
});

export default connect(mapStateToProps)(App);
