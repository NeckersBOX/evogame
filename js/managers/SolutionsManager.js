import SolutionsCore from './core/SolutionsCore'
import { getRandomInt } from '../generics'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('solutions');

class SolutionsManager extends SolutionsCore {
  constructor() {
    super();
  }

  addRandomSolution(skills, range, position) {
    const logPrefix = ':addRandomSolution] ';
    logger.info(logPrefix, '-->');

    logger.debug('Generating skills');
    let solutionSkills = skills.map(skill => {
      let rangeValue = range * skill.value;
      let value = skill.value + getRandomInt(-rangeValue, +rangeValue);

      logger.debug(logPrefix, 'rangeValue:', rangeValue, 'value:', value);

      logger.debug(logPrefix, '<--');
      return {
        key: skill.key,
        value: Math.min(Math.max(value, skill.min ? +skill.min : value), skill.max ? +skill.max : value),
        color: skill.color,
        fitness: 0
      };
    });

    logger.debug('Adding solution');
    this.addSolution(solutionSkills, position);

    logger.info(logPrefix, '<--');
    return this;
  }

  addFitnessEvaluation(skillsManager) {
    const logPrefix = ':addFitnessEvaluation] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, 'Evaluating skills ranges');
    const ranges = skillsManager.getList().map(skill => ({
      ...this.getSkillRangeByKey(skill.key),
      skill: skill.key
    }));

    logger.debug(logPrefix, 'ranges:', ranges);
    logger.info(logPrefix, 'Generate fitness for each solution skill');

    let list = this.state.list.map((solution, idx) => {
      logger.debug(logPrefix, 'Current solution index:', idx);

      let skills = solution.skills.map(skill => {
        logger.debug(logPrefix, '- Evaluating skill ' + skill.key + ' fitness');

        let currSkillRange = ranges.find(r => r.skill == skill.key);
        logger.debug(logPrefix, 'Current skill ranges:', currSkillRange);

        return {
          ...skill,
          fitness: skillsManager.getFitness(skill, currSkillRange.min, currSkillRange.max)
        };
      });

      return {
        ...solution,
        skills,
        fitness: skills.reduce((p, curr) => p + curr.fitness, 0) / skills.length
      };
    });

    this.setState({ list });

    logger.info(logPrefix, '<--');
    return this;
  }

  addSolutionsColors() {
    const logPrefix = ':generateSolutionColor] ';
    logger.info(logPrefix, '-->');

    let list = this.state.list.map((solution, idx) => {
      logger.info(logPrefix, 'Generate colors for solution ' + (idx + 1) + '/' + this.state.list.length);
      logger.debug(logPrefix, '-->');

      const values = solution.skills.map(s => s.fitness);
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

      let colorRanges = solution.skills.map((skill, idx) => ({
        color: skill.color,
        value: valuesRanges[idx] * 100
      })).filter(c => c.value > 0).sort((a, b) => a.value - b.value);

      logger.debug(logPrefix, 'colorRanges:', colorRanges);

      let gradientColors = [];
      let percentage = 0;
      for ( let idx in colorRanges ) {
        gradientColors.push(colorRanges[idx].color + ' ' + percentage + '%');
        percentage += colorRanges[idx].value;
        gradientColors.push(colorRanges[idx].color + ' ' + percentage + '%');
      }

      logger.debug(logPrefix, 'gradientColors:', gradientColors);
      logger.debug(logPrefix, '<--');
      return {
        ...solution,
        color: 'linear-gradient(' + gradientColors.join(',') + ')'
      };
    });

    this.setState({ list });

    logger.info(logPrefix, '<--');
    return this;
  }

  applyDamage(skillManager, damage) {
    const logPrefix = ':applyDamage] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, 'Current solutions:', this.state.list.length);
    let list = this.state.list.filter(solution =>
      !solution.skills.reduce((p, curr) => p |= skillManager.isFatalDamage(curr, damage), false)
    );
    logger.info(logPrefix, 'Filtered solutions:', list.length);

    this.setState({ list });

    logger.info(logPrefix, '<--');
    return this;
  }
}

export default SolutionsManager;
