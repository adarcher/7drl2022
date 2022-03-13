import { Death } from './actions/death.js'
import { Tile } from './tile.js'

export const MobileState = {
  CREATED: 'CREATED',
  ALIVE: 'ALIVE',
  DEAD: 'DEAD',
  DYING: 'DYING',
  ITEM: 'ITEM',
}

export class Mobile extends Tile {
  constructor(map, glyphCode) {
    glyphCode =
      typeof glyphCode === 'string' ? glyphCode.charCodeAt(0) : glyphCode
    super(glyphCode)
    this.name = `Mobile${this.id}`
    this.map = map

    this.backgroundColor = false
    this.foregroundColor = 'red'

    this.onDeath = [Death]
    this.onEmpact = []

    this.state = MobileState.ALIVE

    this.hp = 1
  }

  #state = MobileState.CREATED
  set state(state) {
    this.#state = state
    console.log(`${this.name}: new state is ${state}`)
  }

  get state() {
    return this.#state
  }

  // This is the basic placement, no checks
  MoveTo(tile) {
    this.parent?.Remove(this)
    this.parent = tile
    this.parent.Add(this)
  }

  MoveInto(tile) {
    this.MoveTo(tile)
    this.onImpact(action => action(tile).bind(this))
  }

  Update(dt) {
    //console.log(`${this.name} updating... ${this.state}`)
    if (this.state == MobileState.DYING) {
      this.state = MobileState.DEAD
      this.onDeath.forEach(action => action(this))
      return true
    }
    return false
  }

  Attack(tile) {
    if (tile.children.length > 0) {
      var target = tile.children[0]
      console.log(`${this.name} attacks ${target.name}!`)
    }
  }
}
