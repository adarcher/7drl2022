import { GameTile } from './gameTile.js'
import { Grid } from './grid.js'
import { RandInt } from './misc/util.js'
import { Demon } from './mobiles/demon.js'
import { Mobile } from './mobiles/mobile.js'
import { Player } from './mobiles/player.js'

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
    mobs.forEach(([name, x, y]) => {
      this.Spawn(name, x, y)
    })
  }

  Spawn(name, x, y) {
    let tiles = this.floor.tiles.filter(
      tile =>
        tile.passable &&
        (x === undefined || tile.x === x) &&
        (y === undefined || tile.y === y)
    )

    if (tiles.length > 0) {
      var demon = Demon.Get(name)
      demon.map = this
      demon.MoveTo(tiles[RandInt(0, tiles.length)])
    }
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
