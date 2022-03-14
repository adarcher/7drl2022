import { Death, Respawn } from './actions/death.js'
import { Tile } from '../tile.js'
import { Attribute } from './attributes/attribute.js'

export const MobileState = {
  CREATED: 'CREATED',
  ALIVE: 'ALIVE',
  DEAD: 'DEAD',
  DYING: 'DYING',
  ITEM: 'ITEM',
}

export class Mobile extends Tile {
  constructor(name, map, glyphCode) {
    super(glyphCode)
    this.name = name || `Mobile${this.id}`
    this.map = map

    this.backgroundColor = false
    this.foregroundColor = 'red'

    this.onDeath = [Death, Respawn]
    this.onEmpact = []

    this.state = MobileState.ALIVE

    this.health = new Attribute(10, 0, 100)
    this.magic = new Attribute(10, 0, 100)

    this.experience = new Attribute(0, 0, 1000000)
    this.level = new Attribute(1, 1, 100)

    this.strength = new Attribute(10, 1, 100)
    this.agility = new Attribute(10, 1, 100)
    this.endurance = new Attribute(10, 1, 100)
    this.wisdom = new Attribute(10, 1, 100)
    this.intelligence = new Attribute(10, 1, 100)
    this.luck = new Attribute(10, 1, 100)

    this.skills = []
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
    let changed = false
    if (this.state !== MobileState.DEAD) {
      if (this.health == 0) {
        this.state = MobileState.DEAD
        this.onDeath.forEach(action => action(this))
        changed = true
      }
    }
    return changed
  }

  Attack(tile) {
    if (tile.children.length > 0) {
      var target = tile.children[0]
      if (target.state == MobileState.ALIVE) {
        let damage = this.strength
        damage = target.health.Modify(-damage)
        console.log(`${this.name} attacks ${target.name} for ${damage} damage!`)
        console.log(`  ${target.name} now has ${target.health} health!`)
      }
    }
  }
}
