export const Death = mobile => {
  console.log(`${mobile.name}.onDeath()`)
  mobile.backgroundColor = 'red'
  mobile.foregroundColor = 'pink'
}
