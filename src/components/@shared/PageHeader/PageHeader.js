import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";

import { pageType } from "../../../constants/PageType";
import { changePage } from "./PageHeaderDomain";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  icon: {}
});

class PageHeader extends Component {
  render(){
    const facebookIcon = `${this.props.classes.icon} fab fa-facebook-square`;
    const googleIcon = `${this.props.classes.icon} fab fa-google`;
  
    return (
      <Fragment>
        <Fab
          color="primary"
          className={this.props.classes.fab}
          onClick={() => {
            changePage(pageType.FACEBOOK, this.props.history);
          }}
        >
          <Icon className={facebookIcon} />
        </Fab>
        <Fab
          color="primary"
          className={this.props.classes.fab}
          onClick={() => {
            changePage(pageType.GOOGLE_BUSINESS, this.props.history);
          }}
        >
          <Icon className={googleIcon} />
        </Fab>
      </Fragment>
    );
  }
}

PageHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PageHeader));
