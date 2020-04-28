class Grid {
  constructor(initialPosition) {
    this.position = initialPosition.slice();
    this.output = [];
    this.map = {};
    this.route = [];
    this.deltas = {
      1: [0, 1],
      2: [0, -1],
      3: [-1, 0],
      4: [1, 0],
    };
  }

  storeOutput(content) {
    const delta = this.deltas[this.lastInput];
    const nextPosition = [delta[0] + this.position[0], this.position[1] + delta[1]];
    if (content) {
      !this.map[nextPosition.join(':')] && this.route.push(this.position);
      this.position = nextPosition;
    }
    this.map[nextPosition.join(':')] = content;
    return this.output.push(content);
  }

  getAllPossibleMoves(position = this.position) {
    const possibleMoves = [];
    possibleMoves.push([+position[0], +position[1] + 1]);
    possibleMoves.push([+position[0], +position[1] - 1]);
    possibleMoves.push([+position[0] - 1, +position[1]]);
    possibleMoves.push([+position[0] + 1, +position[1]]);
    return possibleMoves;
  }

  getDirection() {
    const possibleMoves = this.getAllPossibleMoves();
    const validMoves = possibleMoves.filter((move) => this.map[move.join(':')] === undefined);
    if (!validMoves[0]) validMoves[0] = this.route.pop();
    if (validMoves[0][0] < this.position[0]) this.lastInput = 3;
    if (validMoves[0][0] > this.position[0]) this.lastInput = 4;
    if (validMoves[0][1] < this.position[1]) this.lastInput = 2;
    if (validMoves[0][1] > this.position[1]) this.lastInput = 1;
    return this.lastInput;
  }

  isOxygenSystem() {
    return this.output[this.output.length - 1] === 2;
  }

  getMinStep() {
    return this.route.length;
  }

  isEmptySpace() {
    return Object.keys(this.map).reduce((count, move) => count + (this.map[move] === 1), 0);
  }

  getTimeToFillOxygen(time = 0) {
    if (!this.isEmptySpace()) return time;
    const oxygenPosition = Object.keys(this.map).filter((position) => this.map[position] === 2);
    oxygenPosition.forEach((position) => {
      const allMoves = this.getAllPossibleMoves(position.split(':'));
      const emptySpaces = allMoves.filter((space) => this.map[space.join(':')] === 1);
      emptySpaces.forEach((position) => (this.map[position.join(':')] = 2));
    });
    return this.getTimeToFillOxygen(++time);
  }
}

module.exports = {Grid};
