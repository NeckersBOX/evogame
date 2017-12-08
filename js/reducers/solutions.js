import { getRandomInt } from './generics'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('solutions');

const getSkillRange = (skill, solutions) => {
  const logPrefix = ':getSkillRange] ';
  logger.debug(logPrefix, '-->');
  logger.debug(logPrefix, 'Skill key:', skill);

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

  logger.debug(logPrefix, '<--');
  return { min, max };
}

export const buildRandomSolutionSkill = (skills, range) => skills.map(skill => {
  const logPrefix = ':buildRandomSolutionSkill] ';
  logger.debug(logPrefix, '-->');

  let rangeValue = range * skill.value;
  let value = skill.value + getRandomInt(-rangeValue, +rangeValue);

  logger.debug(logPrefix, 'rangeValue:', rangeValue, 'value:', value);

  logger.debug(logPrefix, '<--');
  return {
    key: skill.key,
    value: Math.min(Math.max(value, skill.min ? +skill.min : value), skill.max ? +skill.max : value),
    color: skill.color,
    generateFitness: skill.generateFitness
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
  logger.info(logPrefix, 'Generate fitness for each solution skill');

  let nextSolutions = solutions.map((solution, idx) => {
    logger.debug(logPrefix, 'Current solution index:', idx);

    return {
      ...solution,
      skills: solution.skills.map(skill => {
        logger.debug(logPrefix, '- Evaluating skill ' + skill.key + ' fitness');
        let currSkillRange = ranges.find(r => r.skill == skill.key);

        return {
          ...skill.generateFitness(skill, currSkillRange.min, currSkillRange.max)
        };
      })
    };
  });

  logger.info(logPrefix, '<--');
  return nextSolutions;
};

export const generateSolutionColor = skills => {
  const logPrefix = ':generateSolutionColor] ';
  logger.info(logPrefix, '-->');

  const values = skills.map(s => s.fitness);
  const minVal = values.reduce((prev, curr) => ((curr < prev && curr > 0) || !prev) ? curr : prev);

  logger.debug(logPrefix, 'values:', values);
  logger.debug(logPrefix, 'minVal:', minVal);

  let valuesRanges = new Array(values.length).fill(1 / values.length);
  if ( minVal != 0 ) {
    let ranges = values.map(v => v / minVal);
    logger.debug(logPrefix, 'values parts:', ranges);

    let totRanges = ranges.reduce((a, b) => a + b, 0);
    logger.debug(logPrefix, 'totRanges:', totRanges);

    valuesRanges = ranges.map(r => r / totRanges)
  }

  logger.debug(logPrefix, 'valuesRanges:', valuesRanges, 'tot:', valuesRanges.reduce((p, c) => p + c));

  let colorRanges = skills.map((skill, idx) => ({
    color: skill.color,
    value: valuesRanges[idx] * 100
  })).filter(c => c.value > 0).sort((a, b) => a.value - b.value);

  logger.debug(logPrefix, 'colorRanges:', colorRanges);

  let gradientColors = [];
  let percentage = 0;
  for ( let idx in colorRanges ) {
    gradientColors.push(colorRanges[idx].color + ' ' + percentage + '%');
    percentage += colorRanges[idx].value;
  }

  logger.debug(logPrefix, 'gradientColors:', gradientColors);

  logger.info(logPrefix, '<--');
  return 'linear-gradient(' + gradientColors.join(',') + ')';
};
