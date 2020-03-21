import React, { Component } from "react";
import { connect } from "react-redux";
import "./selectionbar.css";
import styles from "./SelectionBar.module.css";

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

  handleChangeAlgorithm = event => {
    console.log("BEEP");

    if (event.target.value === "dijkstras") {
      this.props.algorithmSelection();
    }
  };

  handleClickStart = () => {
    this.props.start();
  };

  handleReset = () => {
    this.props.reset();
  };
  // could make this into a callback

  componentDidUpdate(prevProps, prevState) {
    let a = this.props.visited.length;
    if (
      prevProps.visited !== this.props.visited &&
      prevProps.shortestPath !== this.props.ShortestPath
    ) {
      for (let node in this.props.nodes) {
        for (let i = 0; i < this.props.visited.length; i++) {
          if (this.props.visited[i] === this.props.nodes[node].id) {
            //this.visitingTheNodesPause(i);
            setTimeout(() => {
              this.props.visitedNode(this.props.visited[i]);
            }, 30 * i);
          }
        }
      }

      for (let node in this.props.nodes) {
        for (let j = 0; j < this.props.shortestPath.length; j++) {
          if (this.props.shortestPath[j] === this.props.nodes[node].id) {
            //this.visitingTheNodesPause(i);
            setTimeout(() => {
              this.props.shortestPathNode(this.props.shortestPath[j]);
            }, 30 * (j + 1 + a));
          }
        }
      }
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <button
          className={this.props.isActive.wall}
          onClick={this.handleClickWall}
        >
          Wall
        </button>

        <button
          className={this.props.isActive.startNode}
          onClick={this.handleClickSNode}
        >
          {" "}
          Start Node
        </button>

        <button
          className={this.props.isActive.finishNode}
          onClick={this.handleClickFNode}
        >
          {" "}
          Finish Node
        </button>
        <select id="Algorithms" onChange={this.handleChangeAlgorithm}>
          <option>Algorthim</option>
          <option value="dijkstras">Djikstras</option>
        </select>
        <button className="Start" onClick={this.handleClickStart}>
          Start
        </button>
        <button className="Reset" onClick={this.handleReset}>
          Reset
        </button>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isActive: state.isActive,
    nodes: state.nodes,
    visited: state.visited,
    shortestPath: state.shortestPath
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
        type: "DIJKSTRAS"
      }),
    visitedNode: id =>
      dispatch({
        type: "VISITED",
        id
      }),
    shortestPathNode: id =>
      dispatch({
        type: "SHORTEST",
        id
      }),

    start: () =>
      dispatch({
        type: "START"
      }),

    reset: () =>
      dispatch({
        type: "RESET"
      })
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SelectionBar);
