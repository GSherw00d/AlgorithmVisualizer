import React, { Component } from "react";
import { connect } from "react-redux";

class SelectionBar extends Component {
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

        <button>Djikstras</button>
        <button className="Start">Start</button>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isActive: state.isActive
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
      })
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SelectionBar);
