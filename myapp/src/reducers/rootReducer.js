function makeNodeArray(rows, columns) {
  let initNode = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      initNode.push({ id: i + "_" + j, type: "EMPTY", callingnode: "" });
    }
  }
  return initNode;
}

const initState = {
  nodes: makeNodeArray(15, 20),
  isActive: {
    wall: false,
    startFinNode: false,
    algorithm: "Null",
    start: false
  }
};

const rootReducer = (state = initState, action) => {
  if (action.type === "WALL_STATUS_CHANGE") {
    let newWall = state.isActive.wall ? false : true;
    return {
      ...state,
      isActive: { ...state.isActive, startFinNode: false, wall: newWall } //want to change the other types of block
    };
  } else if (action.type === "START_FINISH_NODE") {
    let newSFNodes = state.isActive.startFinNode ? false : true;
    return {
      ...state,
      isActive: { ...state.isActive, startFinNode: newSFNodes, wall: false }
    };
  } else if (action.type === "TYPE_CHANGE") {
    let noOfSFNodes = state.nodes.filter(node => {
      return node.type === "SFNODE";
    }).length;
    let newNodes = state.nodes.map(node => {
      if (action.id === node.id && state.isActive.wall === true) {
        return { ...node, type: "WALL" };
      } else if (
        action.id === node.id &&
        state.isActive.startFinNode === true &&
        noOfSFNodes < 2
      ) {
        return node.type === "SFNODE"
          ? {
              ...node,
              type: "EMPTY"
            }
          : {
              ...node,
              type: "SFNODE"
            };
      } else if (
        action.id === node.id &&
        state.isActive.startFinNode === true &&
        node.type === "SFNODE"
      ) {
        return { ...node, type: "EMPTY" };
      }

      return node;
    });
    return { ...state, nodes: newNodes };
  } else {
    return state;
  }
};

export default rootReducer;
