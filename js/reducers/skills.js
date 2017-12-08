import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('skills');

const skills = [
  {
    key: 'cold',
    label: 'Cold Resistance [ °C ]',
    min: '-273',
    defaultValue: '-25',
    value: -25,
    fitness: 0,
    color: '#AFE3D6',
    generateFitness: (skill, min, max) => ({...skill, fitness: (max - skill.value) / Math.abs(max - min)})
  },
  {
    key: 'heat',
    label: 'Heat Resistance [ °C ]',
    min: '-273',
    defaultValue: '45',
    value: 45,
    fitness: 0,
    color: '#6E2620',
    generateFitness: (skill, min, max) => ({...skill, fitness: (skill.value - min) / Math.abs(max - min)})
  },
  {
    key: 'water',
    label: 'Water Resistance [ m ]',
    min: '0',
    defaultValue: '8',
    value: 8,
    fitness: 0,
    color: '#2A6790',
    generateFitness: (skill, min, max) => ({...skill, fitness: (skill.value - min) / Math.abs(max - min)})
  },
  {
    key: 'wind',
    label: 'Wind Resistance [ km/h ]',
    min: '0',
    defaultValue: '90',
    value: 90,
    fitness: 0,
    color: '#6833CC',
    generateFitness: (skill, min, max) => ({...skill, fitness: (skill.value - min) / Math.abs(max - min)})
  }
];

const skillReducer = (state, key, value) => {
  const logPrefix = ':skillReducer] ';
  logger.info(logPrefix, '-->');

  logger.debug(logPrefix, 'key:', key, 'value:', value);

  logger.info(logPrefix, '<--');
  return ({
    ...state,
    skills: skills.map(p => (p.key != key) ? p : {...p, value})
  });
};

export { skills, skillReducer };
