import { Grid } from './grid.js'
import { Renderer } from './renderer.js'
import { TileSet } from './tileset.js'

// After the complete loads, start the loop.
// This will include the tileset for now.
window.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to my 7DRL 2022 Challenge Entry!')

  // Grab the rendering canvas and grow it to the full window area
  var canvas = document.getElementById('game')
  var context = canvas.getContext('2d')
  context.canvas.width = window.innerWidth
  context.canvas.height = window.innerHeight

  let tilesImage = document.getElementById('tileset')
  let tileset = new TileSet(tilesImage)
  let grid = new Grid()

  let renderer = new Renderer(tileset)
  let options = { backgroundColor: 'red', grid: grid, debug: true }

  let t0 = performance.now()
  function RenderLoop() {
    let t1 = performance.now()
    options.fps = 1000.0 / (t1 - t0)
    renderer.Render(context, options)
    t0 = t1
    window.requestAnimationFrame(RenderLoop)
  }

  window.requestAnimationFrame(RenderLoop)
})
