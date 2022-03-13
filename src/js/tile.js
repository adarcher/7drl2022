export class Tile {
  static #id = 0

  constructor(glyph, x, y) {
    this.x = x
    this.y = y
    this.glyph = glyph || 0
    this.backgroundColor = 'black'
    this.foregroundColor = 'white'
    this.children = []

    this.id = Tile.#id++
  }

  #glyph = 0
  get glyph() {
    return this.#glyph
  }
  set glyph(glyph) {
    this.#glyph = glyph
    this.#cachedInfo = false
  }

  Add(child) {
    this.children.unshift(child)
    this.#cachedInfo = false
  }

  Remove(child) {
    this.children = this.children.filter(c => c.id !== child.id)
    this.#cachedInfo = false
  }

  Update(dt) {
    let changed = false
    this.children.forEach(child => (changed |= child.Update(dt)))
    this.#cachedInfo = !changed ? changed : this.#cachedInfo
    return changed
  }

  #cachedInfo = false
  #Info(tileset) {
    if (!this.#cachedInfo) {
      let top = this.children[0] || this
      let info = tileset.GlyphInfo(top.glyph)
      info.bgColor = top.backgroundColor || this.backgroundColor
      info.fgColor = top.foregroundColor

      this.#cachedInfo = info
    }
    return this.#cachedInfo
  }

  RenderBackground(context, options) {
    let o = options
    let glyphInfo = this.#Info(o.tileset)

    context.fillStyle = glyphInfo.bgColor
    context.fillRect(
      o.offset.x + this.x * o.glyphSize,
      o.offset.y + this.y * o.glyphSize,
      o.glyphSize,
      o.glyphSize
    )
  }

  RenderForeground(context, options) {
    let o = options
    let glyphInfo = this.#Info(o.tileset)

    context.fillStyle = glyphInfo.fgColor
    context.fillRect(
      o.offset.x + this.x * o.glyphSize,
      o.offset.y + this.y * o.glyphSize,
      o.glyphSize,
      o.glyphSize
    )
  }

  RenderTile(context, options) {
    let o = options
    let glyphInfo = this.#Info(o.tileset)
    context.drawImage(
      o.tileset.tiles,
      glyphInfo.x,
      glyphInfo.y,
      glyphInfo.size,
      glyphInfo.size,
      o.offset.x + this.x * o.glyphSize,
      o.offset.y + this.y * o.glyphSize,
      o.glyphSize,
      o.glyphSize
    )
  }
}
