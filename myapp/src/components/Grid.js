import React, { Component } from "react";
import { connect } from "react-redux";
import Node from "./NodePlace.js";
import style from "./Grid.module.css";

class Grid extends Component {
  render() {
    const { nodes } = this.props;
    const nodesGrid = nodes.map(node => {
      return <Node key={node.id} id={node.id} />;
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
