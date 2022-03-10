export class TileSet {
  constructor(image, tileSize = false, bufferSize = 1) {
    this.#typeface = image
    this.#glyphSize = tileSize
    this.#bufferSize = bufferSize
  }

  #typeface = false

  #tiles = false
  get tiles() {
    if (this.#tiles === false) {
      console.assert(this.#typeface !== false)
      let t = document.createElement('canvas')
      t.width = this.#typeface.width
      t.height = this.#typeface.height
      let context = t.getContext('2d')
      context.drawImage(this.#typeface, 0, 0)

      // Assume: Black/White image
      // Black => transparent
      // Alpha == rgb average
      let pixels = context.getImageData(0, 0, t.width, t.height)
      let i = 0
      while (i < pixels.data.length) {
        let rgb = pixels.data[i++] + pixels.data[i++] + pixels.data[i++]
        pixels.data[i++] = 255 - rgb / 3
      }
      context.putImageData(pixels, 0, 0)

      this.#tiles = t
    }
    return this.#tiles
  }

  #bufferSize = false
  #glyphSize = false
  get glyphSize() {
    if (this.#glyphSize === false) {
      this.#glyphSize = this.tiles.width / 16 - this.#bufferSize
      console.log(`TileSet, GlyphSize: ${this.#glyphSize}`)
    }
    return this.#glyphSize
  }

  // TODO: rename, this is the location/size
  GlyphInfo(index) {
    let buffer = this.#bufferSize
    let size = this.glyphSize
    let tileSize = size + buffer
    // Buffer current is hardcoded to be left and bottom of tile
    let x = buffer + (index % 16) * tileSize
    let y = Math.floor(index / 16) * tileSize
    return { x, y, size }
  }
}
