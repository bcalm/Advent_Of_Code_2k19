class Game {
  constructor(initialBallPosition, initialPaddlePosition) {
    this.ballPos = initialBallPosition;
    this.paddlePos = initialPaddlePosition;
    this.output = [];
    this.score = 0;
    this.grid = {};
  }

  getInput() {
    if (this.ballPos[0] < this.paddlePos[0]) return -1;
    if (this.ballPos[0] > this.paddlePos[0]) return 1;
    return 0;
  }

  storeOutput(content) {
    return this.output.push(content);
  }

  updateGrid() {
    const position = this.output.slice(0, 2);
    const tiles = {
      0: () => (this.grid[position.join(':')] = 'empty'),
      1: () => (this.grid[position.join(':')] = 'Block'),
      2: () => (this.grid[position.join(':')] = 'Wall'),
      3: () => (this.paddlePos = position),
      4: () => (this.ballPos = position),
    };
    tiles[this.output[2]]();
  }

  updateScore() {
    this.score = this.output[2];
  }

  play() {
    if (this.output.length === 3) {
      const [x, y] = this.output;
      x === -1 && y === 0 ? this.updateScore() : this.updateGrid();
      this.output = [];
    }
  }

  getScore() {
    return this.score;
  }
}

module.exports = {Game};
