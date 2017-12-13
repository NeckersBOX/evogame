import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('skills');

const skills = [
  {
    key: 'cold',
    label: 'Cold Resistance',
    unit: '°C',
    min: '-273',
    defaultValue: '-25',
    lessThan: 'heat',
    value: -25,
    fitness: 0,
    color: '#E0E0E0',
    generateFitness: (skill, min, max) => ({
      ...skill,
      fitness: max == min ? 1 : ((max - skill.value) / Math.abs(max - min))
    })
  },
  {
    key: 'heat',
    label: 'Heat Resistance',
    unit: '°C',
    min: '-273',
    defaultValue: '45',
    greaterThan: 'cold',
    value: 45,
    fitness: 0,
    color: '#ED6A5A',
    generateFitness: (skill, min, max) => ({
      ...skill,
      fitness: max == min ? 1 : ((skill.value - min) / Math.abs(max - min))
    })
  },
  {
    key: 'water',
    label: 'Water Resistance',
    unit: 'm',
    min: '0',
    defaultValue: '8',
    value: 8,
    fitness: 0,
    color: '#9BC1BC',
    generateFitness: (skill, min, max) => ({
      ...skill,
      fitness: max == min ? 1 : ((skill.value - min) / Math.abs(max - min))
    })
  },
  {
    key: 'wind',
    label: 'Wind Resistance',
    unit: 'km/h',
    min: '0',
    defaultValue: '90',
    value: 90,
    fitness: 0,
    color: '#8A84E2',
    generateFitness: (skill, min, max) => ({
      ...skill,
      fitness: max == min ? 1 : ((skill.value - min) / Math.abs(max - min))
    })
  }
];

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

export { skills, skillReducer };
