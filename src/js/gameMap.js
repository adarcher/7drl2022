import { Grid } from './grid.js'
import { Player } from './player.js'

export class GameMap {
  constructor(mapDefinition) {
    this.name = mapDefinition.name
    this.floor = new Grid(mapDefinition)
    this.mobile = new Grid()

    this.ParseFloor(mapDefinition.definition)

    this.player = new Player({ x: 15, y: 10 }, this.floor)
    this.mobile.cells = [this.player]
  }

  ParseFloor(str) {
    this.floor.cells.forEach((cell, i) => {
      cell.state = str.charCodeAt(i)
    })
  }

  Attach() {
    this.player.Attach()
  }

  Detach() {
    this.player.Detach()
  }

  Update() {
    this.floor.Update()
    this.mobile.Update()
  }

  Render(surface, options) {
    this.floor.Render(surface, options)
    this.mobile.Render(surface, options)
  }
}
