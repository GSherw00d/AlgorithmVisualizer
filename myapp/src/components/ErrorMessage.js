import React, { Component } from "react";
import { connect } from "react-redux";

class ErrorMessage extends Component {
  render() {}
}

const mapStatetoProps = state => {
  return {
    nodes: state.nodes
  };
};

//Want to see which of the isActives are toggled
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(ErrorMessage);
