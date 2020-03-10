import React, { Component } from "react";
import { connect } from "react-redux";
//import node from "./Nodes.js";

class Grid extends Component {
  render() {
    const { nodes } = this.props;
    const nodesGrid = nodes.map(node => {
      return (
        <div>
          <p key={node.id}>I am node {node.id}</p>
        </div>
      );
    });

    return (
      <div>
        <div className="GridContainer">{nodesGrid}</div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    nodes: state.nodes
  };
};

export default connect(mapStatetoProps)(Grid);
