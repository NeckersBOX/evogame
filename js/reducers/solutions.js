import { getRandomInt } from './generics'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('solutionsReducer');

const getSkillRange = (skill, solutions) => {
  const logPrefix = ':getSkillRange] ';
  logger.info(logPrefix, '-->');

  let [ min, max ] = [ undefined, undefined ];

  for ( let i in solutions ) {
    let currSkillValue = solutions[i].skills.find(s => s.key == skill).value;
    logger.debug(logPrefix, 'currSkillValue:', currSkillValue, 'at Index:', i);

    if ( min == undefined || currSkillValue < min ) {
      min = currSkillValue;
    }

    if ( max == undefined || currSkillValue > max ) {
      max = currSkillValue;
    }
  }

  logger.info(logPrefix, '<--');
  return { min, max };
}

export const buildRandomSolutionSkill = (skills, range) => skills.map(skill => {
  const logPrefix = ':buildRandomSolutionSkill] ';
  logger.info(logPrefix, '-->');

  let rangeValue = range * skill.value;
  let value = skill.value + getRandomInt(-rangeValue, +rangeValue);

  logger.debug(logPrefix, 'rangeValue:', rangeValue, 'value:', value);

  logger.info(logPrefix, '<--');
  return {
    key: skill.key,
    value: Math.min(Math.max(value, skill.min ? +skill.min : value), skill.max ? +skill.max : value),
    color: skill.color
  };
});

export const evaluateSolutionsFitness = (skills, solutions) => {
  const logPrefix = ':evaluateSolutionsFitness] ';
  logger.info(logPrefix, '-->');

  logger.info(logPrefix, 'Elaborating skills ranges');
  const ranges = skills.map(skill => ({
    ...getSkillRange(skill.key, solutions),
    skill: skill.key
  }));

  logger.debug(logPrefix, 'ranges:', ranges);

  logger.info(logPrefix, '<--');
  return solutions.map(solution => ({
    ...solution,
    skills: solution.skills.map(skill => {
      logger.info(logPrefix, '- Evaluating skill ' + skill.key + ' fitness');

      let fitness = (skill.value / ranges.find(r => r.skill == skill.key).max);

      logger.debug(logPrefix, 'skill value:', skill.value);
      logger.debug(logPrefix, 'fitness:', fitness);

      return {
        ...skill,
        fitness
      };
    })
  }));
};

export const generateSolutionColor = skills => {
  const logPrefix = ':generateSolutionColor] ';
  logger.info(logPrefix, '-->');

  let values = skills.map(s => s.fitness);
  let [ min, max ] = [
    values.reduce((v, prev) => v < prev ? v : prev),
    values.reduce((v, prev) => v > prev ? v : prev)
  ];

  logger.debug(logPrefix, 'values:', values);
  logger.debug(logPrefix, 'min:', min, 'max:', max);

  let colorRanges = skills.map(skill => ({
    color: skill.color,
    value: (skill.fitness / max) * 100
  }));

  logger.debug(logPrefix, 'colorRanges:', colorRanges);

  let colors = [];
  for ( let i in colorRanges ) {
    if ( i == 0 ) {
      colors.push(colorRanges[i].color);
    }
    else {
      colors.push(colorRanges[i].color + ' ' + colorRanges[i - 1].value + '%');
    }
  }

  logger.debug(logPrefix, 'colors:', colors);

  logger.info(logPrefix, '<--');
  return 'radial-gradient(' + colors.join(',') + ')';
};
