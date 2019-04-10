import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Fab from "@material-ui/core/Fab";

import PageHeader from "../../@shared/PageHeader/PageHeader";
import Page from "../../@shared/Page/Page";
import { actionCreators as tinyPngActionCreators } from "../../../store/TinyPng";

class FacebookPage extends Component {
  render() {
    return (
      <Page>
        <PageHeader />
        <h1>Facebook</h1>
        <Fab color="primary" onClick={() => this.props.actions.resizeImage()}>
          RESIZE IMAGE
        </Fab>
        <p>Is Error: {this.props.isError?"Yes":"No"}</p>
        <p>Error Message: {this.props.errorMessage}</p>
      </Page>
    );
  }
}

FacebookPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  resizedImage: PropTypes.object,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  actions: PropTypes.shape({
    resizeImage: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({
  isLoading: state.tinyPng.isLoading,
  resizedImage: state.tinyPng.resizedImage,
  isError: state.tinyPng.isError,
  errorMessage: state.tinyPng.errorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        resizeImage: tinyPngActionCreators.resizeImage
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacebookPage);
