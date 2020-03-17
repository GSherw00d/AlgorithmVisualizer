import { algorithm } from "../components/Algorithms.js";

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
  isActive: {
    wall: "false",
    startNode: "false",
    finishNode: "false",
    algorithm: "Null"
  }
};

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
  } else if (action.type === "DJIKSTRAS") {
    return {
      ...state,
      isActive: {
        ...state.isActive,
        algorithm: "djikstras"
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
  } else if (action.type === "START") {
    return {
      ...state,
      visited: algorithm(state.isActive.algorithm, state.nodes)
    };
  } else {
    return state;
  }
};

export default rootReducer;
