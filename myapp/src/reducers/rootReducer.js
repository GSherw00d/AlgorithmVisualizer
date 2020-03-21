import { dijkstras } from "../components/Dijkstras.js";

//Have to make this more readable, have split stuff into functions,
//learn how to combine reducers to make the root reducer more managable

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
  visited: [],
  shortestPath: [],
  errorMessage: "",
  isActive: {
    wall: "false",
    startNode: "false",
    finishNode: "false",
    algorithm: "Null"
  }
};

function algorithmChoice(state) {
  let allNodeTypes = state.nodes.map(node => {
    if (node.type === "SNODE") {
      return "SNODE";
    } else if (node.type === "FNODE") {
      return "FNODE";
    } else {
      return 0;
    }
  });
  //Checking all the nodes are present.
  if (allNodeTypes.indexOf("SNODE") === -1) {
    return {
      ...state,
      errorMessage: "*Please place a starting node"
    };
  } else if (allNodeTypes.indexOf("FNODE") === -1) {
    return {
      ...state,
      errorMessage: "*Please place a finish node"
    };
  } else if (state.isActive.algorithm === "Null") {
    console.log(state.isActive.algorithm);
    return {
      ...state,
      errorMessage: "*Please choose an algorithm"
    };
  } else {
    let [a, b] = dijkstras(state.isActive.algorithm, state.nodes);
    if (a === "Error") {
      return { ...state, errorMessage: "There is no valid path" };
    }
    return {
      ...state,
      visited: a,
      shortestPath: b,
      errorMessage: ""
    };
  }
}

const rootReducer = (state = initState, action) => {
  if (action.type === "WALL_STATUS_CHANGE") {
    let newWall = state.isActive.wall === "true" ? "false" : "true";
    return {
      ...state,
      isActive: {
        ...state.isActive,
        startNode: "false",
        finishNode: "false",
        wall: newWall
      } //want to change the other types of block
    };
  } else if (action.type === "DIJKSTRAS") {
    return {
      ...state,
      isActive: {
        ...state.isActive,
        algorithm: "dijkstras"
      }
    };
  } else if (action.type === "START_NODE") {
    let newSNodes = state.isActive.startNode === "true" ? "false" : "true";
    return {
      ...state,
      isActive: {
        ...state.isActive,
        startNode: newSNodes,
        finishNode: "false",
        wall: "false"
      }
    };
  } else if (action.type === "FINISH_NODE") {
    let newFNodes = state.isActive.finishNode === "true" ? "false" : "true";
    return {
      ...state,
      isActive: {
        ...state.isActive,
        startNode: "false",
        finishNode: newFNodes,
        wall: "false"
      }
    };
  } else if (action.type === "TYPE_CHANGE") {
    let noOfSNodes = state.nodes.filter(node => {
      return node.type === "SNODE";
    }).length;

    let noOfFNodes = state.nodes.filter(node => {
      return node.type === "FNODE";
    }).length;

    let newNodes = state.nodes.map(node => {
      if (action.id === node.id && state.isActive.wall === "true") {
        return {
          ...node,
          type: "WALL"
        };
      } else if (
        action.id === node.id &&
        state.isActive.startNode === "true" &&
        noOfSNodes < 1
      ) {
        return node.type === "SNODE"
          ? {
              ...node,
              type: "EMPTY"
            }
          : {
              ...node,
              type: "SNODE"
            };
      } else if (
        action.id === node.id &&
        state.isActive.startNode === "true" &&
        node.type === "SNODE"
      ) {
        return { ...node, type: "EMPTY" };
      } else if (
        action.id === node.id &&
        state.isActive.finishNode === "true" &&
        noOfFNodes < 1
      ) {
        return node.type === "FNODE"
          ? {
              ...node,
              type: "EMPTY"
            }
          : {
              ...node,
              type: "FNODE"
            };
      } else if (
        action.id === node.id &&
        state.isActive.finishNode === "true" &&
        node.type === "FNODE"
      ) {
        return { ...node, type: "EMPTY" };
      }

      return node;
    });

    return { ...state, nodes: newNodes };
  } else if (action.type === "VISITED") {
    let visitedNodes = state.nodes.map(node => {
      return action.id === node.id ? { ...node, type: "VISITED" } : { ...node };
    });
    return { ...state, nodes: visitedNodes };
  } else if (action.type === "SHORTEST") {
    let shortestPathNodes = state.nodes.map(node => {
      return action.id === node.id
        ? { ...node, type: "SHORTEST" }
        : { ...node };
    });
    return { ...state, nodes: shortestPathNodes };
  } else if (action.type === "START") {
    return algorithmChoice(state);
  } else if (action.type === "RESET") {
    let resetNodes = state.nodes.map(node => {
      return { ...node, type: "EMPTY" };
    });
    return {
      ...state,
      errors: {
        startNode: false,
        finishNode: false,
        algorthim: false,
        message: ""
      },
      nodes: resetNodes
    };
  } else {
    return state;
  }
};

export default rootReducer;
