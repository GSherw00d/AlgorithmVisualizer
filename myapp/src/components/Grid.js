import React, { Component } from "react";
import { connect } from "react-redux";
import Node from "./NodePlace.js";

class Grid extends Component {
  render() {
    const { nodes } = this.props;
    const nodesGrid = nodes.map(node => {
      return (
        <div>
          <Node id={this.props.nodes.id} />
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
