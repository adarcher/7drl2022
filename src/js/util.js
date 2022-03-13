export const RandInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min)

export const Location = (index, width) => [
  Math.floor(index % width),
  Math.floor(index / width),
]

export class Position {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  Set(x, y) {
    this.x = x
    this.y = y
  }

  Add(dx, dy) {
    this.x += dx
    this.y += dy
  }

  Sub(dx, dy) {
    this.Add(-dx, -dy)
  }

  Import({ x, y }) {
    this.x = x
    this.y = y
  }

  Export() {
    return { x: this.x, y: this.y }
  }
}
