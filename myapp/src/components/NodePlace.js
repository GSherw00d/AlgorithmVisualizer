import React, { Component } from "react";
import { connect } from "react-redux";

class Node extends Component {
  render() {
    return (
      <div>
        <p>I am node {this.props.id}</p>
      </div>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  let id = ownProps.id;
  console.log(ownProps);
  //returning just the element of the array we want for this node
  return {
    nodes: state.nodes.find(node => node.id === id)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(Node);
