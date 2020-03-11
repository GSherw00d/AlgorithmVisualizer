import React, { Component } from "react";
import { connect } from "react-redux";
import Node from "./NodePlace.js";
import style from "./Grid.module.css";

class Grid extends Component {
  render() {
    const { nodes } = this.props;
    const nodesGrid = nodes.map(node => {
      return (
        <div className={style.NodeElement} key={node.id}>
          <Node id={node.id} />
        </div>
      );
    });

    return (
      <div>
        <div className={style.GridContainer}>{nodesGrid}</div>
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
