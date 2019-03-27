import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import FacebookPage from "./components/pages/FacebookPage/FacebookPage";
import GoogleBusinessPage from "./components/pages/GoogleBusinessPage/GoogleBusinessPage";

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
              <Route exact path="/" component={FacebookPage} />
              <Route exact path="/google-business" component={GoogleBusinessPage} />
              <Route component={FacebookPage} />
            </Switch>
          </MuiThemeProvider>
        </CssBaseline>
      </BrowserRouter>
    );
  }
}
export default App;