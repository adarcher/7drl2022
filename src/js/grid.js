export class Cell {
  constructor(location, state = 0, color = ['yellow', 'blue']) {
    this.location = location
    this.state = state
    this.color = color
  }

  Render(context) {
    let o = context.options
    let glyphInfo = o.tileset.GlyphInfo(this.state)

    context.drawImage(
      o.tileset.tiles,
      glyphInfo.x,
      glyphInfo.y,
      glyphInfo.size,
      glyphInfo.size,
      this.location.x * o.glyphSize,
      this.location.y * o.glyphSize,
      o.glyphSize,
      o.glyphSize
    )
  }
}

export class Grid {
  constructor(size = {}) {
    this.size = {}
    this.size.width = size.width || 30
    this.size.height = size.height || 20

    this.Resize()
  }

  // Cells
  cells = []

  Resize() {
    this.cells.length = this.size.width * this.size.height

    let loc = index => ({
      x: Math.floor(index % this.size.width),
      y: Math.floor(index / this.size.width),
    })

    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = new Cell(loc(i))
    }
  }

  DebugFill() {
    function RandInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
    this.cells.forEach(cell => (cell.state = RandInt(2, 250)))
  }

  Render(context) {
    this.DebugFill()
    this.cells.forEach(c => c.Render(context))
  }
}
