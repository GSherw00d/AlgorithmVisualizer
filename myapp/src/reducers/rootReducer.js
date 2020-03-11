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
  console.log(action);
  if (action.type === "WALL_STATUS_CHANGE") {
    let newWall = state.isActive.wall ? false : true;
    return {
      ...state,
      isActive: { ...state.isActive, wall: newWall }
    };
  } else if (action.type === "TYPE_CHANGE") {
    let newNodes = state.nodes.map(node => {
      if (action.id === node.id) {
        return { ...node, type: "WALL" };
      }
      return node;
    });
    return { ...state, nodes: newNodes };
  } else {
    return state;
  }
};

export default rootReducer;
