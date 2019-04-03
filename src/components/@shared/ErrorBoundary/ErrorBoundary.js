import React, { Component } from "react";

import FacebookPage from "../../pages/FacebookPage/FacebookPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    if (error)
      console.log(error.toString());

    if (info)
      console.log(info.componentStack);
      
    this.setState({ hasError: true });
    this.props.actions.createError(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <FacebookPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
