class Game {
  constructor(initialBallPosition, initialPaddlePosition) {
    this.ballPos = initialBallPosition;
    this.paddlePos = initialPaddlePosition;
    this.output = [];
    this.grid = {};
    this.score = 0;
  }

  getInput() {
    if (this.ballPos[0] < this.paddlePos[0]) return -1;
    if (this.ballPos[0] > this.paddlePos[0]) return 1;
    return 0;
  }

  storeOutput(content) {
    return this.output.push(content);
  }

  play() {
    if (this.output.length !== 3) return;
    const [x, y] = this.output;
    if (x === -1 && y === 0) {
      this.score = this.output[2];
    } else {
      const tileId = this.output[2];
      const updateGrid = {
        0: () => {},
        1: () => {},
        2: () => {},
        3: () => (this.paddlePos = [x, y]),
        4: () => (this.ballPos = [x, y]),
      };
      updateGrid[tileId]();
    }
    this.output = [];
  }

  getScore() {
    return this.score;
  }
}

module.exports = {Game};
