export const RandInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min)

export const Location = (index, width) => [
  Math.floor(index % width),
  Math.floor(index / width),
]

export let Cached = Base =>
  class extends Base {
    static cache = {}
    static Add(definition) {
      let name = definition.name
      if (this.cache[name] === undefined) {
        this.cache[name] = definition
      } else {
        console.warn(
          `${this.name} Definition with name(${name}) already added!`
        )
      }
    }
    static Load(definitions) {
      definitions.forEach(definition => this.Add(definition))
    }
    static Get(name) {
      return new this(this.cache[name])
    }
    static Copy() {}
  }
