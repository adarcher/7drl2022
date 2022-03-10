export class Cell {
  constructor(location, state) {
    this.location = location
    this.state = state || 0
    this.backgroundColor = 'black'
    this.foregroundColor = 'white'
  }

  #state = 0
  get state() {
    return this.#state
  }
  set state(state) {
    this.#state = state
    this.#cachedInfo = false
  }

  #cachedInfo = false
  #Info(tileset) {
    if (!this.#cachedInfo) {
      this.#cachedInfo = tileset.GlyphInfo(this.state)
    }
    return this.#cachedInfo
  }

  RenderBackground(context, options) {
    let o = options

    context.fillStyle = this.backgroundColor
    context.fillRect(
      o.offset.x + this.location.x * o.glyphSize,
      o.offset.y + this.location.y * o.glyphSize,
      o.glyphSize,
      o.glyphSize
    )
  }

  RenderForeground(context, options) {
    let o = options

    context.fillStyle = this.foregroundColor
    // foreground.globalComositeOperation = 'source-over'
    context.fillRect(
      o.offset.x + this.location.x * o.glyphSize,
      o.offset.y + this.location.y * o.glyphSize,
      o.glyphSize,
      o.glyphSize
    )
  }

  RenderTile(context, options) {
    let o = options
    let glyphInfo = this.#Info(o.tileset)
    // foreground.globalCompositeOperation = 'destination-in'
    context.drawImage(
      o.tileset.tiles,
      glyphInfo.x,
      glyphInfo.y,
      glyphInfo.size,
      glyphInfo.size,
      o.offset.x + this.location.x * o.glyphSize,
      o.offset.y + this.location.y * o.glyphSize,
      o.glyphSize,
      o.glyphSize
    )
  }
}
