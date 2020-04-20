class IntCode {
  constructor(code) {
    this.signals = code.slice();
    this.ptrPos = 0;
  }

  isDone() {
    return this.signals[this.ptrPos] === 99;
  }

  getDistanceFromPtr(location) {
    return location - this.ptrPos;
  }

  movePtrBy(length) {
    if (!this.isDone()) {
      return (this.ptrPos += length);
    }

    return null;
  }

  updateMemory(dest, content) {
    if (!this.signals[dest]) {
      this.signals[dest] = 0;
    }
    return this.signals.splice(dest, 1, content);
  }
}

module.exports = {IntCode};
