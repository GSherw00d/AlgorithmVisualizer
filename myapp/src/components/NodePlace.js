import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./Grid.module.css";
import "./Grid.css";
import ReactDOM from "react-dom";

class Node extends Component {
  handleMouseDown = () => {
    this.props.typeChange(this.props.id);
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener(
      "mouseover",
      this.mouseDragOver
    );
  }

  mouseDragOver = e => {
    if (e.buttons === 1 || e.buttons === 3) {
      this.handleMouseDown();
    }
  };

  render() {
    let type = this.props.nodes.type;
    return (
      <div
        className={style.element + " " + type} //this.props.nodes.type}
        onMouseDown={this.handleMouseDown}
        id={style.type}
      ></div>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  let id = ownProps.id;
  //returning just the element of the array we want for this node
  return {
    nodes: state.nodes.find(node => node.id === id)
  };
};

//figure out which of the buttons is pressed to send an action
const mapDispatchToProps = dispatch => {
  return {
    typeChange: id =>
      dispatch({
        type: "TYPE_CHANGE",
        id
      })
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Node);
