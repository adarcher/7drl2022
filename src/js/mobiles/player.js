import { Mobile } from './mobile.js'

export class Player extends Mobile {
  constructor(map, glyph = 2) {
    super('Player', map, glyph)
    this.foregroundColor = 'yellow'

    this.demons = []
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

  MoveTo(tile, force) {
    if (force || tile.passable) {
      super.MoveTo(tile)
      return true
    }
    this.Attack(tile)
    return false
  }

  MoveUp(event) {
    var tile = this.map.TileAt(this.parent.x, this.parent.y - 1)
    this.MoveTo(tile)
    event.preventDefault()
  }
  MoveDown(event) {
    var tile = this.map.TileAt(this.parent.x, this.parent.y + 1)
    this.MoveTo(tile)
    event.preventDefault()
  }
  MoveLeft(event) {
    var tile = this.map.TileAt(this.parent.x - 1, this.parent.y)
    this.MoveTo(tile)
    event.preventDefault()
  }
  MoveRight(event) {
    var tile = this.map.TileAt(this.parent.x + 1, this.parent.y)
    this.MoveTo(tile)
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
