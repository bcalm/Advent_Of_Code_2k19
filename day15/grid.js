class Grid {
  constructor(initialPosition) {
    this.row = initialPosition[0];
    this.col = initialPosition[1];
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
    const nextPosition = [delta[0] + this.row, this.col + delta[1]];
    if (content) {
      !this.map[nextPosition.join(':')] && this.route.push([this.row, this.col]);
      [this.row, this.col] = nextPosition;
    }
    this.map[nextPosition.join(':')] = content;
    return this.output.push(content);
  }

  getAllPossibleMoves(position = [this.row, this.col]) {
    const possibleMoves = [];
    possibleMoves.push([position[0], position[1] + 1]);
    possibleMoves.push([position[0], position[1] - 1]);
    possibleMoves.push([position[0] - 1, position[1]]);
    possibleMoves.push([position[0] + 1, position[1]]);
    return possibleMoves;
  }

  getDirection() {
    const possibleMoves = this.getAllPossibleMoves();
    const validMoves = possibleMoves.filter((move) => this.map[move.join(':')] === undefined);
    if (!validMoves[0]) validMoves[0] = this.route.pop();
    if (validMoves[0][0] < this.row) this.lastInput = 3;
    if (validMoves[0][0] > this.row) this.lastInput = 4;
    if (validMoves[0][1] < this.col) this.lastInput = 2;
    if (validMoves[0][1] > this.col) this.lastInput = 1;
    return this.lastInput;
  }

  isOxygenSystem() {
    return this.output[this.output.length - 1] === 2;
  }

  getMinStep() {
    return this.route.length;
  }
}

module.exports = {Grid};
