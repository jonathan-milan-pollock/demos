import React, { Component } from "react";

import PageHeader from "../../@shared/PageHeader/PageHeader";
import Page from "../../@shared/Page/Page";

class HomePage extends Component {

  render() {
    return (
      <Page>
        <PageHeader />
        <h1>Home</h1>
      </Page>
    );
  }
}

export default HomePage;
