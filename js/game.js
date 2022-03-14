import { DemoMap } from '../data/maps.js'
import { FPS } from './misc/fps.js'
import { GameMap } from './gameMap.js'
import { Renderer } from './renderer.js'
import { RenderSurface } from './renderSurface.js'
import { TileSet } from './tileset.js'
import { Demon } from './mobiles/demon.js'
import { Demons } from '../data/demons.js'
import { Skill } from './mobiles/skills/skill.js'
import { Skills } from '../data/skills.js'

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

  Skill.Load(Skills)
  Demon.Load(Demons)

  let grid = new GameMap(DemoMap)
  grid.Attach()

  let surface = new RenderSurface(canvas)
  let renderer = new Renderer(surface)
  let options = {
    tileset: tileset,
    backgroundColor: 'red',
    grid: grid,
    debug: true,
    offset: { x: 0, y: 0 },
  }

  options.fps = new FPS()
  function RenderLoop() {
    let dt = false
    if ((dt = options.fps.Calc())) {
      options.grid.Update(dt)
      renderer.Render(options)
    }
    window.requestAnimationFrame(RenderLoop)
  }

  window.requestAnimationFrame(RenderLoop)
})
