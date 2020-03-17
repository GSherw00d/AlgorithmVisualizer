//return the visited nodes in order in an array.
//return the shortest path in order
export function algorithm(algorithmThatisActive, currentNodes) {
  let a = [];
  if (algorithmThatisActive === "djikstras")
    for (let i = 0; i < currentNodes.length; i++) {
      a.push(currentNodes[i].id);
    }
  return a;
  //now all I need to do is to learn djistras algorithm
  //need to check for a start and a finish.
  //Lets assume they are there for the time being
}
