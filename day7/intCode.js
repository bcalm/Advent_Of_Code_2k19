class IntCode {
  constructor(code) {
    this.memory = code.slice();
    this.instructionPointer = 0;
    this.relativeBase = 0;
  }

  isDone() {
    return this.memory[this.instructionPointer] === 99;
  }

  getCommand() {
    return this.memory[this.instructionPointer];
  }

  getContent(location) {
    return this.memory[location] || 0;
  }

  getCurrentParams(instrLength, paramModes) {
    const params = this.memory.slice(
      this.instructionPointer + 1,
      this.instructionPointer + instrLength
    );

    return params.map((param, index) => {
      if (this.getCommand() % 10 === 3 || (index === 2 && paramModes[index] === 2)) {
        return this.relativeBase + param;
      }

      return paramModes[index] === 2
        ? this.getContent(this.relativeBase + param)
        : paramModes[index] === 1
        ? param
        : this.getContent(param);
    });
  }

  movePtrBy(length) {
    if (!this.isDone()) {
      return (this.instructionPointer += length);
    }

    return null;
  }

  getDistanceFromPtr(location) {
    return location - this.instructionPointer;
  }

  updateMemory(dest, content) {
    if (!this.memory[dest]) {
      this.memory[dest] = 0;
    }
    return this.memory.splice(dest, 1, content);
  }
}

module.exports = {IntCode};
