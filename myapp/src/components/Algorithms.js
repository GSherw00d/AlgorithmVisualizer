//return the visited nodes in order in an array.
//return the shortest path in order
export function algorithm(algorithmThatisActive, currentNodes) {
  const minTotalCosts = {}; // map of node and int {id : "distance"}
  const prevNodes = {}; // map of node and node {id: "id"}
  let minPQ = []; // list of objects node and in [{id: x, distance: x}]
  const visited = []; //array of nodes

  let removeSmallest = minPQ => {
    let smallestDistance = Infinity;
    let index = -1;
    let node = {};
    for (let i = 0; i < minPQ.length; i++) {
      if (minPQ[i].distance < smallestDistance) {
        smallestDistance = minPQ[i].distance;
        index = i;
        node = minPQ[i];
      }
    }
    minPQ.splice(index, 1);
    //need to return the new minPQ as well
    return node;
  };

  let nodesNeighbours = (newSmallest, nodesGoingIntoDijkstras) => {
    let rcNS = newSmallest.id.split("_"); //use a for loop
    let n = [];
    for (let i = 0; i < nodesGoingIntoDijkstras.length; i++) {
      let rc = nodesGoingIntoDijkstras[i].id.split("_");

      if (
        (Math.abs(parseInt(rcNS[0]) - parseInt(rc[0])) === 1 ||
          Math.abs(parseInt(rcNS[1]) - parseInt(rc[1])) === 1) &&
        Math.abs(
          parseInt(rcNS[0]) -
            parseInt(rc[0]) +
            parseInt(rcNS[1]) -
            parseInt(rc[1])
        ) === 1 &&
        (Math.abs(parseInt(rcNS[0]) - parseInt(rc[0])) === 0 ||
          Math.abs(parseInt(rcNS[1]) - parseInt(rc[1])) === 0)
      ) {
        n.push(nodesGoingIntoDijkstras[i]);
      }
    }
    return n;
  };

  let containsNeighbour = (visited, node) => {
    // visited as array node as string
    if (visited.indexOf(node.id) !== -1) {
      return true;
    }
    return false;
  };

  //find start node
  const startNodeId = currentNodes
    .find(node => {
      return node.type === "SNODE";
    })
    .id.toString();

  const finishNodeId = currentNodes.find(node => {
    return node.type === "FNODE";
  }).id;
  //Need to put in error handling here

  const nodesGoingIntoDijkstras = currentNodes.filter(
    node => node.type !== "WALL"
  );

  minTotalCosts[startNodeId] = 0; //Set start node cost to 0
  minPQ.push({ id: startNodeId, distance: 0 }); //Add start node to minPQ

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
      if (!containsNeighbour(visited, neighbours[i])) {
        //check if the neighbour has been visited
        let altPath = minTotalCosts[newSmallest.id] + 1; //make a path, check distance
        console.log(altPath);
        if (altPath < minTotalCosts[neighbours[i]]) {
          // Check if new path better
          minTotalCosts[neighbours[i]] = altPath; //Update path length for neighbour
          prevNodes[neighbours[i]] = newSmallest.id; //Update previous node to node we just removed

          for (let j = 0; j < minPQ.length; i++) {
            //Update priority in minPQ
            if (minPQ[j].id === neighbours[0]) {
              minPQ[j] = { id: neighbours[0], distance: altPath };
            }
          }
        }
      }
    }
  }

  console.log(minTotalCosts);
  // then we would return the total cost and the previous node.
  //However what about the list of visited nodes, i reckon we just return that straight as is. Bet as each node is the same cost we can return the visited
  //nodes list up to the finish node.

  return ["1_1"];
  //now all I need to do is to learn djistras algorithm
  //need to check for a start and a finish.
  //Lets assume they are there for the time being
}
