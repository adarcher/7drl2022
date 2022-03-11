import { Cell } from './cell.js'

export class Player extends Cell {
  constructor(position, map, glyph = 2) {
    super(position, glyph)
    this.glyph = glyph
    this.map = map

    this.backgroundColor = 'yellow'
    this.foregroundColor = 'blue'
  }

  set glyph(value) {
    this.state = value
  }

  get glyph() {
    return this.state
  }

  #onkeydown = false
  Attach() {
    this.#onkeydown = document.onkeydown
    document.onkeydown = this.KeyDown.bind(this)
  }

  Detach() {
    console.assert(this.#onkeydown)
    document.onkeydown = this.#onkeydown
  }

  #valid = ' '.charCodeAt(0)
  Check(x, y) {
    return this.map.CellAt({ x, y }).state === this.#valid
  }

  MoveTo(x, y) {
    if (this.Check(x, y)) {
      this.location.x = x
      this.location.y = y
      return true
    }
    return false
  }

  MoveUp(event) {
    if (this.MoveTo(this.location.x, this.location.y - 1))
      event.preventDefault()
  }
  MoveDown(event) {
    if (this.MoveTo(this.location.x, this.location.y + 1))
      event.preventDefault()
  }
  MoveLeft(event) {
    if (this.MoveTo(this.location.x - 1, this.location.y))
      event.preventDefault()
  }
  MoveRight(event) {
    if (this.MoveTo(this.location.x + 1, this.location.y))
      event.preventDefault()
  }

  KeyDown(event) {
    if (!event.defaultPrevented) {
      switch (event.code) {
        case 'KeyS':
        case 'ArrowDown':
          this.MoveDown(event)
          break
        case 'KeyW':
        case 'ArrowUp':
          this.MoveUp(event)
          break
        case 'KeyA':
        case 'ArrowLeft':
          this.MoveLeft(event)
          break
        case 'KeyD':
        case 'ArrowRight':
          this.MoveRight(event)
          break
      }
    }
  }
}
