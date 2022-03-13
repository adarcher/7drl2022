import { Grid } from './grid.js'

export class FPS {
  constructor(target = 120, smoothing = 0.7) {
    this.target = target
    this.smoothing = smoothing

    this.t0 = 0
    this.t1 = 0
    this.current = 0

    this.grid = new Grid({ width: 5, height: 1 })
  }

  Calc() {
    let t0 = this.t1 || 0
    let t1 = performance.now()
    let fps = 1000.0 / (t1 - t0)
    let a = this.smoothing
    let b = 1 - a
    let current = Math.round(a * this.current + b * fps)
    // Bonus return to check capped rendering
    let cap = current <= this.target
    if (cap) {
      this.t0 = t0
      this.t1 = t1
      this.current = current
    }
    return cap ? t1 - t0 : false
  }

  Render(surface, options) {
    let o = options
    if (o.debug) {
      const bottom = surface.height / o.glyphSize - 1
      let str = `${this.current}`.padStart(5, '.')
      this.grid.tiles.forEach((tile, i) => {
        tile.glyph = str.charCodeAt(i)
        tile.y = bottom
      })
      this.grid.Render(surface, options)
    }
  }
}
