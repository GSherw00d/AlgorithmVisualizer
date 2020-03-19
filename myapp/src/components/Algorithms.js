//return the visited nodes in order in an array.
//return the shortest path in order
export function algorithm(algorithmThatisActive, currentNodes) {
  const minTotalCosts = {}; // map of node and int {id : "x", distance: x}
  const prevNodes = {}; // map of node and node {id: "id"}
  const minPQ = []; // list of nodes
  const visited = []; //array of nodes

  let removeSmallest = minPQ => {
    let smallestDistance = Infinity;
    let index = -1;
    let node = {};
    console.log(minPQ);
    for (let i = 0; i < minPQ.length; i++) {
      if (this.minPQ[i].distance < smallestDistance) {
        smallestDistance = this.minPQ[i].distance;
        index = i;
        node = minPQ[i];
      }
    }
    minPQ.splice(index, 1);
    return node.id;
  };

  let nodesNeighbours = (newSmallest, nodesGoingIntoDijkstras) => {
    //I haven't tested this yet;
    let rcNS = newSmallest.split("_"); //use a for loop
    let n = [];
    for (let i = 0; i < nodesGoingIntoDijkstras.length; i++) {
      let rc = nodesGoingIntoDijkstras[i].split("_");
      if (Math.abs(rcNS[0] - rc[0]) === 1 && Math.abs(rcNS[1] - rc[1])) {
        n.push(nodesGoingIntoDijkstras[i]);
      }
    }
    return n;
  };

  //find start node
  const startNodeId = currentNodes.find(node => {
    return node.type === "SNODE";
  }).id;

  const finishNodeId = currentNodes.find(node => {
    return node.type === "FNODE";
  }).id;
  //Need to put in error handling here

  const nodesGoingIntoDijkstras = currentNodes.filter(
    node => node.type !== "WALL"
  );

  console.log(nodesGoingIntoDijkstras);
  minTotalCosts[startNodeId] = 0; //Set start node cost to 0
  minPQ[startNodeId] = minTotalCosts.startNodeId; //Add start node to minPQ

  for (let i = 0; i < nodesGoingIntoDijkstras.length; i++) {
    if (nodesGoingIntoDijkstras[i].id !== startNodeId) {
      //for all nodes other than start
      minTotalCosts[nodesGoingIntoDijkstras[i].id] = Infinity; //set the distance to infinity at first, since any path we find will be shorter
    }
  }

  while (minPQ.length !== 0) {
    //Main loop
    let newSmallest = removeSmallest(minPQ);
    let neighbours = nodesNeighbours(newSmallest, nodesGoingIntoDijkstras); // find neighbours of this node

    for (let i = 0; i < neighbours.length; i++) {
      //check neighbours
      if (!visited.containsNeighbour()) {
        //GOT TO HERE
        //check if the neighbour has been visited
        let altPath =
          minTotalCosts.get(newSmallest) + distance(newSmallest, neighbours); //make a path, check distance
        if (altPath < minTotalCosts.get(neighbours)) {
          // Check if new path better
          minTotalCosts.put(neighbours, altpath); //Update path length for neighbour
          prevNodes.put(neighbours, newSmallest); //Update previous node to node we just removed

          minPQ.decreasePriority(neighbours, altPath); //Update priority in minPQ
        }
      }
    }
  }

  // then we would return the total cost and the previous node.
  //However what about the list of visited nodes, i reckon we just return that straight as is. Bet as each node is the same cost we can return the visited
  //nodes list up to the finish node.

  return ["1_1"];
  //now all I need to do is to learn djistras algorithm
  //need to check for a start and a finish.
  //Lets assume they are there for the time being
}
