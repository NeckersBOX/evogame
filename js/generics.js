import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from './loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('generics');

export const getRandomInt = (min, max) => {
  [ min, max ] = [ Math.ceil(min), Math.floor(max) ];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getValueInScale = (scale, value) => {
  const logPrefix = ':getValueInScale] ';
  logger.info(logPrefix, '-->');

  let result = null;

  for ( let i in scale ) {
    if ( value <= scale[i].value || i == scale.length - 1 ) {
      result = scale[i];
      break;
    }
  }

  if ( result === null ) {
    logger.info(logPrefix, 'No valid value found');
    result = { label: '', value: 0 };
  }

  logger.debug(logPrefix, 'value in scale:', result.value, 'associated with label:', result.label);

  logger.info(logPrefix, '<--');
  return result;
}
