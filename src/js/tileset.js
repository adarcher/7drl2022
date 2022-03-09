export class TileSet {
  constructor(image) {
    this.#typeface = image
  }

  #typeface = false

  #tiles = false
  get tiles() {
    console.assert(this.#typeface !== false)
    if (this.#tiles === false) {
      let t = document.createElement('canvas')
      // Typeface should be square
      // Common for double height padding
      t.width = this.#typeface.width
      t.height = this.#typeface.width
      // Assuming 16x16 tiles with 1px buffer
      const context = t.getContext('2d')
      context.drawImage(this.#typeface, 0, 0)

      this.#tiles = t
    }
    return this.#tiles
  }

  #glyphSize = false
  get glyphSize() {
    if (this.#glyphSize === false) {
      this.#glyphSize = this.tiles.width / 16 - 1
      console.log(`TileSet, GlyphSize: ${this.#glyphSize}`)
    }
    return this.#glyphSize
  }

  // TODO: rename, this is the location/size
  GlyphInfo(index) {
    let size = this.glyphSize
    let x = 1 + (index % 16) * (size + 1)
    let y = Math.floor(index / 16) * (size + 1)
    return { x, y, size }
  }
}
