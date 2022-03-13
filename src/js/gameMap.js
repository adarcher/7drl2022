import { GameTile } from './gameTile.js'
import { Grid } from './grid.js'
import { Mobile } from './mobile.js'
import { Player } from './player.js'

class FloorGrid extends Grid {
  constructor(mapDefinition, offset) {
    super(mapDefinition, offset, GameTile)
  }
}

export class GameMap {
  constructor(mapDefinition) {
    this.name = mapDefinition.name
    this.passables = mapDefinition.passables
    this.floor = new FloorGrid(mapDefinition)

    this.ParseFloor(mapDefinition.definition)

    this.player = new Player(this)
    this.player.MoveTo(this.TileAt(15, 10), true)

    this.ParseMobs(mapDefinition.mobs)
  }

  TileAt(x, y) {
    return this.floor.TileAt(x, y)
  }

  ParseFloor(str) {
    this.floor.tiles.forEach((tile, i) => {
      tile.glyph = str.charCodeAt(i)
      tile.passable = this.passables.includes(str.charAt(i))
    })
  }

  ParseMobs(mobs) {
    mobs.forEach(([glyph, x, y]) => {
      var mob = new Mobile(this, glyph)
      mob.MoveTo(this.TileAt(x, y), true)
    })
  }

  Attach() {
    this.player.Attach()
  }

  Detach() {
    this.player.Detach()
  }

  Update() {
    this.floor.Update()
  }

  Render(surface, options) {
    this.floor.Render(surface, options)
  }
}
