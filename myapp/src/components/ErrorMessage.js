import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./errormessage.module.css";

class ErrorMessage extends Component {
  render() {
    return <div className={styles.container}> {this.props.errorMessage}</div>;
  }
}

const mapStatetoProps = state => {
  return {
    errorMessage: state.errorMessage
  };
};

//Want to see which of the isActives are toggled
//const mapDispatchToProps = dispatch => {
//return {};
//};

export default connect(mapStatetoProps)(ErrorMessage);
