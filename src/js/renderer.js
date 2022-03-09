import { Cell } from './grid.js'

export class Renderer {
  constructor(tileset) {
    console.assert(tileset !== undefined)
    this.#tileset = tileset
  }

  #tileset = false

  backgroundColor = 'black'
  forgroundColor = 'white'

  state = ''

  set state(newState) {
    // Update changes
    this.state = newState
  }

  RenderOptions(context, options = {}) {
    options.x ||= 0
    options.y ||= 0
    options.width ||= context.canvas.width
    options.height ||= context.canvas.height

    options.backgroundColor ||= this.backgroundColor
    options.forgroundColor ||= this.forgroundColor

    options.tileset ||= this.#tileset
    options.glyphSize ||= 16
    options.scale = options.glyphSize / options.tileset.glyphSize
    return options
  }

  Render(context, options) {
    let o = this.RenderOptions(context, options)
    context.options = o

    context.fillStyle = o.backgroundColor
    context.fillRect(o.x, o.y, o.width, o.height)

    if (o.grid) {
      o.grid.Render(context)
    }

    // FPS debug
    if (o.fps !== undefined && o.debug) {
      const bottom = context.canvas.height / o.glyphSize - 1
      let fpsString = `${o.fps}`.padStart(5, '.')
      let fpsGlyphs = [0, 1, 2, 3, 4].map(
        i => new Cell({ x: i, y: bottom }, fpsString.charCodeAt(i))
      )
      fpsGlyphs.forEach(g => g.Render(context))
    }
  }
}
