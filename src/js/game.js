import { Renderer } from './renderer.js'

// After the complete loads, start the loop.
// This will include the tileset for now.
window.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to my 7DRL 2022 Challenge Entry!')

  // Grab the rendering canvas and grow it to the full window area
  var canvas = document.getElementById('game')
  var context = canvas.getContext('2d')
  context.canvas.width = window.innerWidth
  context.canvas.height = window.innerHeight

  let renderer = new Renderer()

  renderer.Render(context, { backgroundColor: 'red' })
})
