function makeNodeArray(rows, columns) {
  let initNode = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      initNode.push({ row: i, column: j, type: "" });
    }
  }
  return initNode;
}

const initState = {
  node: makeNodeArray(10, 15)
};

const rootReducer = (state = initState, action) => {
  console.log(action);
};

export default rootReducer;
