import { Tile } from './tile.js'
import { RandInt, Location } from './misc/util.js'
import { RandomColor } from './misc/colors.js'

export class Grid {
  constructor(size = {}, offset = {}, tilePrototype = Tile) {
    // Size is in tile count
    this.width = size?.width || 0
    this.height = size?.height || 0

    // Offset is in pixels
    this.x = offset?.x || 0
    this.y = offset?.y || 0

    this.tiles = []
    this.tilePrototype = tilePrototype
    this.Resize()
  }

  Resize() {
    let length = this.width * this.height
    this.tiles.length = length

    for (let i = 0; i < length; i++) {
      this.tiles[i] = new this.tilePrototype(0, ...Location(i, this.width))
    }
  }

  TileAt(x, y) {
    return this.tiles.at(x + y * this.width)
  }

  Update(dt) {
    this.tiles.forEach(tile => tile.Update(dt))
  }

  DebugFill() {
    this.tiles.forEach(tile => {
      tile.glyph = RandInt(0, 255)
      tile.backgroundColor = RandomColor()
      tile.foregroundColor = RandomColor()
    })
  }

  RenderBackground(context, options) {
    this.tiles.forEach(c => c.RenderBackground(context, options))
  }

  RenderForeground(context, options) {
    this.tiles.forEach(c => c.RenderForeground(context, options))
  }

  RenderTiles(context, options) {
    this.tiles.forEach(c => c.RenderTile(context, options))
  }

  Render(surface, options) {
    let bg = surface.background
    let fg = surface.foreground

    this.RenderBackground(bg, options)

    this.RenderForeground(fg, options)
    fg.globalCompositeOperation = 'destination-out'
    this.RenderTiles(fg, options)
    fg.globalCompositeOperation = 'source-over'
  }
}

export class DemoGrid extends Grid {
  Update() {
    this.DebugFill()
  }
}
