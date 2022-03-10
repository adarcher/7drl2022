export const RandInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min)

export const Location = (index, width) => ({
  x: Math.floor(index % width),
  y: Math.floor(index / width),
})
