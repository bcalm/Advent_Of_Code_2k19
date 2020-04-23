class Robot {
  constructor(initialPosition, initialColor, initialDirection) {
    this.currentPosition = initialPosition.slice();
    this.currentDirection = initialDirection;
    this.grid = {};
    this.colorCurrentPosition(initialColor);
  }

  colorCurrentPosition(color) {
    this.grid[this.currentPosition.join(':')] = color;
  }

  getGrid() {
    return this.grid;
  }

  move(output) {
    const [value, turn] = output;
    let newDirection;
    const color = value ? 'WHITE' : 'BLACK';
    this.colorCurrentPosition(color);
    if (this.currentDirection === 'UP') {
      this.currentPosition = turn
        ? [this.currentPosition[0] + 1, this.currentPosition[1]]
        : [this.currentPosition[0] - 1, this.currentPosition[1]];
      newDirection = turn ? 'RIGHT' : 'LEFT';
    }
    if (this.currentDirection === 'DOWN') {
      this.currentPosition = turn
        ? [this.currentPosition[0] - 1, this.currentPosition[1]]
        : [this.currentPosition[0] + 1, this.currentPosition[1]];
      newDirection = turn ? 'LEFT' : 'RIGHT';
    }
    if (this.currentDirection === 'LEFT') {
      this.currentPosition = turn
        ? [this.currentPosition[0], this.currentPosition[1] + 1]
        : [this.currentPosition[0], this.currentPosition[1] - 1];
      newDirection = turn ? 'UP' : 'DOWN';
    }
    if (this.currentDirection === 'RIGHT') {
      this.currentPosition = turn
        ? [this.currentPosition[0], this.currentPosition[1] - 1]
        : [this.currentPosition[0], this.currentPosition[1] + 1];
      newDirection = turn ? 'DOWN' : 'UP';
    }
    this.currentDirection = newDirection;
  }

  currentPanelColor() {
    return this.grid[this.currentPosition.join(':')] === 'White';
  }
}

module.exports = {Robot};
