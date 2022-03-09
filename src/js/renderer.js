export class Renderer {
  constructor(typeface) {
    this.typeface = typeface
  }

  #tileset = false
  backgroundColor = 'black'
  forgroundColor = 'white'

  state = ''

  set state(newState) {
    // Update changes
    this.state = newState
  }

  get tileset() {
    if (!this.#tileset) {
      let image = document.getElementById('tileset')
      this.#tileset = document.createElement('canvas')
      this.#tileset.width = image.width
      this.#tileset.height = image.width
      const context = this.#tileset.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
    }
    return this.#tileset
  }

  Render(context, options = {}) {
    // Get tileset
    let tileset = this.tileset
    // Clear frame
    let x = options.x || 0
    let y = options.y || 0
    let width = options.width || context.canvas.width
    let height = options.height || context.canvas.height

    let backgroundColor = options.backgroundColor || this.backgroundColor
    let forgroundColor = options.forgroundColor || this.forgroundColor

    context.fillStyle = backgroundColor
    context.fillRect(x, y, width, height)

    // Test case: show the 30th glyph in-place in the frame; double it's size
    let i = 30
    let size = 8
    let sx = 1 + (i % 16) * (size + 1)
    let sy = 1 + Math.floor(i / 16) * (size + 1)
    context.drawImage(
      tileset,
      sx,
      sy,
      size,
      size,
      sx * 2,
      sy * 2,
      size * 2,
      size * 2
    )
  }
}
