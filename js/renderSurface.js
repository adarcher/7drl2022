export class RenderSurface {
  constructor(canvas) {
    console.assert(canvas)
    this.canvas = canvas
    this.backgroundCanvas = false
    this.foregroundCanvas = false

    this.backgroundColor = 'black'
    this.foregroundColor = 'white'

    this.Resize()
  }

  #background = false
  get background() {
    if (this.#background === false) {
      if (this.backgroundCanvas === false) {
        this.backgroundCanvas = document.createElement('canvas')
      }
      this.#background = this.backgroundCanvas.getContext('2d')
    }
    return this.#background
  }

  #foreground = false
  get foreground() {
    if (this.#foreground === false) {
      if (this.foregroundCanvas === false) {
        this.foregroundCanvas = document.createElement('canvas')
      }
      this.#foreground = this.foregroundCanvas.getContext('2d')
    }
    return this.#foreground
  }

  get width() {
    return this.canvas.width
  }
  get height() {
    return this.canvas.height
  }

  Resize() {
    let width = this.width
    let height = this.height

    var background = this.background
    background.canvas.width = width
    background.canvas.height = height

    var foreground = this.foreground
    foreground.canvas.width = width
    foreground.canvas.height = height
  }

  Clear(rect) {
    this.background.clearRect(rect.x, rect.y, rect.width, rect.height)
    this.foreground.clearRect(rect.x, rect.y, rect.width, rect.height)
  }

  Combine() {
    let context = this.canvas.getContext('2d')

    context.drawImage(this.backgroundCanvas, 0, 0)
    context.drawImage(this.foregroundCanvas, 0, 0)
  }
}
