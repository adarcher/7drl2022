import { Tile } from './tile.js'

export class GameTile extends Tile {
  constructor(glyphCode, x, y, passable) {
    super(glyphCode, x, y)
    this.passable = passable || true
  }

  #passable = true
  get passable() {
    return this.children.length > 0 ? false : this.#passable
  }

  set passable(value) {
    this.#passable = value
  }
}
