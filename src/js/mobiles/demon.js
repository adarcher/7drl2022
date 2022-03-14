import { Cached } from '../misc/util.js'
import { Mobile } from './mobile.js'
import { Skill } from './skills/skill.js'

export class Demon extends Cached(Mobile) {
  constructor(definition) {
    super(definition.name, undefined, definition.glyph)

    definition.attributes.forEach(attribute => {
      this[attribute.name].Set(attribute.value)
    })

    this.skills = definition?.skills.map(skillName => Skill.Get(skillName))
  }
}
