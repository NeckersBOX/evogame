import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from './loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('generics');

export const getRandomInt = (min, max) => {
  [ min, max ] = [ Math.ceil(min), Math.floor(max) ];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
