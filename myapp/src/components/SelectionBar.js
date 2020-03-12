import React, { Component } from "react";
import { connect } from "react-redux";

class SelectionBar extends Component {
  handleClickWall = () => {
    this.props.wallActive();
    console.log(this.props.isActive);
  };

  handleClickSFNode = () => {
    this.props.sfNodeActive();
  };

  render() {
    return (
      <div>
        <button className="Wall" onClick={this.handleClickWall}>
          Wall
        </button>
        <button className="StartFinNode" onClick={this.handleClickSFNode}>
          {" "}
          SFNode
        </button>
        <button className="Algorithm">Algorithm</button>
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
    sfNodeActive: () =>
      dispatch({
        type: "START_FINISH_NODE"
      })
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SelectionBar);
