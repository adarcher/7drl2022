import { Cached } from '../../misc/util.js'

export class Skill extends Cached(Object) {
  constructor(definition) {
    super()
    this.name = definition.name
  }

  Apply(actor, target) {}
}
