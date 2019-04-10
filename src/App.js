import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import HomePage from "./components/pages/HomePage/HomePage";
import FacebookPage from "./components/pages/FacebookPage/FacebookPage";
import InstagramPage from "./components/pages/InstagramPage/InstagramPage";
import LinkedInPage from "./components/pages/LinkedInPage/LinkedInPage";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#333333"
    }
  }
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <CssBaseline>
          <MuiThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/facebook" component={FacebookPage} />
              <Route exact path="/instagram" component={InstagramPage} />
              <Route exact path="/linked-in" component={LinkedInPage} />
              <Route component={HomePage} />
            </Switch>
          </MuiThemeProvider>
        </CssBaseline>
      </BrowserRouter>
    );
  }
}
export default App;