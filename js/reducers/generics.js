export const getRandomInt = (min, max) => {
  [ min, max ] = [ Math.ceil(min), Math.floor(max) ];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
