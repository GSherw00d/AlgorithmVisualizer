function makeNodeArray(rows, columns) {
  let initNode = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      initNode.push({ id: i + "_" + j, type: "", callingnode: "" });
    }
  }
  return initNode;
}

const initState = {
  nodes: makeNodeArray(10, 15)
};

const rootReducer = (state = initState, action) => {
  console.log(action);
  return state;
};

export default rootReducer;
