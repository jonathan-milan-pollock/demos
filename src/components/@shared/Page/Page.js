import React, { Component } from "react";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import "./Page.scss";

class Page extends Component {
  render() {
    return <ErrorBoundary>{this.props.children}</ErrorBoundary>;
  }
}

export default Page;
