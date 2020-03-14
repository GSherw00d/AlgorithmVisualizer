import React, { Component } from "react";
import { connect } from "react-redux";
import Node from "./NodePlace.js";
import style from "./Grid.module.css";

class Grid extends Component {
  //WE GET RETURNED A LIST OF NODES CALLED IN ORDER. HOW CAN WE MAKE THEM CHANGE COLOR 1 BY 1. iF THESE  WERE IN THE STATE COULD UPDATE THE STATE 1 BY 1 WITH A PAUSE INBETWEEN. i thik this is
  // the best way, the function should be in selection bar that means.
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
