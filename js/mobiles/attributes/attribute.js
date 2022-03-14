export class Attribute {
  constructor(value, min = 0, max = 100) {
    this.value = value
    this.min = min
    this.max = max
  }

  Set(value) {
    this.value = Math.max(Math.min(this.value + value, this.max), this.min)
    return this.value
  }

  Modify(value) {
    let previousValue = this.value
    this.value = Math.max(Math.min(this.value + value, this.max), this.min)
    return previousValue - this.value
  }

  [Symbol.toPrimitive](hint) {
    return this.value
  }
}
