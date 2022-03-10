export class Renderer {
  constructor(surface) {
    console.assert(surface !== undefined)
    this.#surface = surface
  }

  #surface = false

  backgroundColor = 'black'
  forgroundColor = 'white'

  RenderOptions(options = {}) {
    options.x ||= 0
    options.y ||= 0
    options.width ||= this.#surface.width
    options.height ||= this.#surface.height

    options.backgroundColor ||= this.backgroundColor
    options.forgroundColor ||= this.forgroundColor

    console.assert(options.tileset)
    options.glyphSize ||= 16
    options.scale = options.glyphSize / options.tileset.glyphSize
    return options
  }

  Render(options) {
    let o = this.RenderOptions(options)

    this.#surface.Clear(o)

    if (o.grid) {
      o.grid.Render(this.#surface, o)
    }

    if (o.fps) {
      o.fps.Render(this.#surface, o)
    }

    this.#surface.Combine()
  }
}
