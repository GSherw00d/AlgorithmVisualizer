import React, { Component } from "react";
import { connect } from "react-redux";
import { algorithm } from "./Algorithms.js";

class SelectionBar extends Component {
  state = {
    triedNodesInOrder: algorithm(
      this.props.isActive.algorithm,
      this.props.nodes
    ),
    shortestPath: algorithm(this.props.isActive, this.props.nodes)
  };

  handleClickWall = () => {
    this.props.wallActive();
    console.log(this.props.isActive);
  };

  handleClickSNode = () => {
    this.props.sNodeActive();
  };

  handleClickFNode = () => {
    this.props.fNodeActive();
  };

  handleClickAlgorithm = () => {
    this.props.algorithmSelection();
  };

  handleClickStart = () => {
    console.log(this.state.triedNodesInOrder);
  };
  render() {
    return (
      <div>
        <button className="Wall" onClick={this.handleClickWall}>
          Wall
        </button>
        <button className="StartNode" onClick={this.handleClickSNode}>
          {" "}
          Start Node
        </button>
        <button className="FinNode" onClick={this.handleClickFNode}>
          {" "}
          Finish Node
        </button>

        <button className="Algorithm" onClick={this.handleClickAlgorithm}>
          Djikstras
        </button>
        <button className="Start" onClick={this.handleClickStart}>
          Start
        </button>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isActive: state.isActive,
    nodes: state.nodes
  };
};

//Want to see which of the isActives are toggled
const mapDispatchToProps = dispatch => {
  return {
    wallActive: () =>
      dispatch({
        type: "WALL_STATUS_CHANGE" //Not sure if this is the right way of doing things
      }),
    sNodeActive: () =>
      dispatch({
        type: "START_NODE"
      }),
    fNodeActive: () =>
      dispatch({
        type: "FINISH_NODE"
      }),
    algorithmSelection: () =>
      dispatch({
        type: "DJIKSTRAS"
      }),
    typeChangeNodePath: id =>
      dispatch({
        type: "TYPE_CHANGE_SHORTEST_PATH",
        id
      })
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SelectionBar);
