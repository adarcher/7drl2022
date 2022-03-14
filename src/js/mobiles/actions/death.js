export const Death = mobile => {
  console.log(`${mobile.name}.onDeath()`)
  mobile.backgroundColor = 'red'
  mobile.foregroundColor = 'pink'
}

export const Respawn = mobile => {
  console.log(`${mobile.name}.respawn()`)
  mobile.map.Spawn(mobile.name)
}
