import { getRandomInt } from './generics'

const getSkillRange = (skill, solutions) => {
  let [ min, max ] = [ undefined, undefined ];

  for ( let i in solutions ) {
    let currSkillValue = solutions[i].skills.find(s => s.key == skill).value;
    if ( min == undefined || currSkillValue < min ) {
      min = currSkillValue;
    }

    if ( max == undefined || currSkillValue > max ) {
      max = currSkillValue;
    }
  }

  return { min, max };
}

export const buildRandomSolutionSkill = (skills, range) => skills.map(skill => {
  let rangeValue = range * skill.value;
  let value = skill.value + getRandomInt(-rangeValue, +rangeValue);

  return {
    key: skill.key,
    value: Math.min(Math.max(value, skill.min ? +skill.min : value), skill.max ? +skill.max : value),
    color: skill.color
  };
});

export const evaluateSolutionsFitness = (skills, solutions) => {
  const ranges = skills.map(skill => ({
    ...getSkillRange(skill.key, solutions),
    skill: skill.key
  }));

  return solutions.map(solution => ({
    ...solution,
    skills: solution.skills.map(skill => ({
      ...skill,
      fitness: 1 - (skill.value / ranges.find(r => r.skill == skill.key).max)
    }))
  }));
};

export const generateSolutionColor = skills => {
  let values = skills.map(s => s.fitness);
  let [ min, max ] = [
    values.reduce((v, prev) => v < prev ? v : prev),
    values.reduce((v, prev) => v > prev ? v : prev)
  ];

  let colorRanges = skills.map(skill => ({
    color: skill.color,
    value: (skill.fitness / max) * 100
  }));

  let colors = [];
  for ( let i in colorRanges ) {
    if ( i == 0 ) {
      colors.push(colorRanges[i].color);
    }
    else {
      colors.push(colorRanges[i].color + ' ' + colorRanges[i - 1].value + '%');
    }
  }

  return 'radial-gradient(' + colors.join(',') + ')';
};
