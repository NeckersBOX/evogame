import log from './loglevel-custom'
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

export const compareObjects = (a, b) => {
  if ( typeof a != 'object' || typeof b != 'object' ) {
    throw new Error('Invalid arguments (a: ' + (typeof a) + ', b: ' + (typeof b) + ')');
    return false;
  }

  for ( let key in a ) {
    if ( !b.hasOwnProperty(key) ) {
      return false;
    }

    if ( typeof a[key] != typeof b[key] ) {
      return false;
    }

    if ( typeof a[key] != 'object' ) {
      if ( a[key] !== b[key] ) {
        return false;
      }
    }
    else if ( !compareObjects(a[key], b[key]) ) {
      return false;
    }
  }

  return true;
}

export const sumEqualsKey = (a, b) => {
  if ( typeof a != 'object' || typeof b != 'object' ) {
    throw new Error('Invalid arguments (a: ' + (typeof a) + ', b: ' + (typeof b) + ')');
    return false;
  }

  let object = {
    ...b,
    ...a
  };

  for ( let key in a ) {
    if ( !b.hasOwnProperty(key) ) {
      continue;
    }

    if ( typeof a[key] != 'object' ) {
      object[key] = a[key] + b[key];
    }
    else {
      object[key] = sumEqualsKey(a[key], b[key]);
    }
  }

  return object;
}
