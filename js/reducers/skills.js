import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('skills');

const skillReducer = (state, key, value) => {
  const logPrefix = ':skillReducer] ';
  logger.info(logPrefix, '-->');

  logger.debug(logPrefix, 'key: `' + key + '` value: `' + value + '`');

  let nextState = ({
    ...state,
    skills: state.skills.map(p => {
      if ( p.key != key ) {
        return p;
      }

      if ( p.hasOwnProperty('min') && +value < +p.min ) {
        logger.info(logPrefix, 'Prevent set a value less than minimum');
        return p;
      }

      if ( p.hasOwnProperty('max') && +value > +p.max ) {
        logger.info(logPrefix, 'Prevent set a value greater than maximum');
        return p;
      }

      if ( p.hasOwnProperty('lessThan') ) {
        logger.info(logPrefix, 'Property ' + p.key + ' must be less than ' + p.lessThan);
        let lessThanValue = state.skills.find(s => s.key == p.lessThan).value;

        if ( value >= lessThanValue ) {
          logger.info(logPrefix, 'Property not respected ( ' + value + ' >= ' + lessThanValue + ' )');
          return p;
        }
        else {
          logger.info(logPrefix, 'Property respected ( ' + value + ' < ' + lessThanValue + ' )');
        }
      }

      if ( p.hasOwnProperty('greaterThan') ) {
        logger.info(logPrefix, 'Property ' + p.key + ' must be greater than ' + p.greaterThan);
        let greaterThanValue = state.skills.find(s => s.key == p.greaterThan).value;

        if ( value <= greaterThanValue ) {
          logger.info(logPrefix, 'Property not respected ( ' + value + ' <= ' + greaterThanValue + ' )');
          return p;
        }
        else {
          logger.info(logPrefix, 'Property respected ( ' + value + ' > ' + greaterThanValue + ' )');
        }
      }

      return {...p, value};
    })
  });

  logger.info(logPrefix, '<--');
  return nextState;
};

export { skillReducer };
