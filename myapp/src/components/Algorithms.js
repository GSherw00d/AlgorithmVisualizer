//return the visited nodes in order in an array.
//return the shortest path in order
export function algorithm(algorithmThatisActive, currentNodes) {
  const minTotalCosts = {};
  const prevNodes = {};
  const MinPQ = {};
  const visited = [];

  //find start node
  const startNodeId = currentNodes.find(node => {
    return node.type === "SNODE";
  }).id;

  const FinishNodeId = currentNodes.find(node => {
    return node.type === "FNODE";
  }).id;
  //Need to put in error handling here

  const nodesGoingIntoDijkstras = currentNodes.filter(
    node => node.type !== "WALL"
  );
  console.log(nodesGoingIntoDijkstras);
  minTotalCosts[startNodeId] = 0; //Set start node cost to 0
  MinPQ[startNodeId] = minTotalCosts.startNodeId; //Add start node to minPQ

  for (let i = 0; i < nodesGoingIntoDijkstras.length; i++) {
    if (nodesGoingIntoDijkstras[i].id !== startNodeId) {
      //for all nodes other than start
      minTotalCosts[nodesGoingIntoDijkstras[i].id] = Infinity; //set the distance to infinity
    }
  }

  console.log(minTotalCosts);

  return ["1_1"];
  //now all I need to do is to learn djistras algorithm
  //need to check for a start and a finish.
  //Lets assume they are there for the time being
}
