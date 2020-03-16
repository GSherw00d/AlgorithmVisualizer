import React, { Component } from "react";
import { connect } from "react-redux";

class SelectionBar extends Component {
  handleClickWall = () => {
    this.props.wallActive();
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
    this.props.start();
  };

  visitingTheNodesPause = i => {
    setTimeout(() => {
      this.props.visitedNode(this.props.visited[i]);
    }, 500 * i);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.visited !== this.props.visited) {
      for (let node in this.props.nodes) {
        for (let i = 0; i < this.props.visited.length; i++) {
          if (this.props.visited[i] === this.props.nodes[node].id) {
            this.visitingTheNodesPause(i);
          }
        }
      }
    }
  }

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
    nodes: state.nodes,
    visited: state.visited
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
    visitedNode: id =>
      dispatch({
        type: "VISITED",
        id
      }),

    start: () =>
      dispatch({
        type: "START"
      })
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SelectionBar);
