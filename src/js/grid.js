import { Cell } from './cell.js'
import { RandInt, Location } from './util.js'
import { RandomColor } from './colors.js'

export class Grid {
  constructor(size = {}, offset = {}) {
    // Size is in tile count
    this.width = size?.width || 30
    this.height = size?.height || 20

    // Offset is in pixels
    this.x = offset?.x || 0
    this.y = offset?.y || 0

    this.cells = []
    this.Resize()
  }

  Resize() {
    let length = this.width * this.height
    this.cells.length = length

    for (let i = 0; i < length; i++) {
      this.cells[i] = new Cell(Location(i, this.width))
    }
  }

  DebugFill() {
    this.cells.forEach(cell => {
      cell.state = RandInt(0, 255)
      cell.backgroundColor = RandomColor()
      cell.foregroundColor = RandomColor()
    })
  }

  RenderBackground(context, options) {
    this.cells.forEach(c => c.RenderBackground(context, options))
  }

  RenderForeground(context, options) {
    this.cells.forEach(c => c.RenderForeground(context, options))
  }

  RenderTiles(context, options) {
    this.cells.forEach(c => c.RenderTile(context, options))
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
