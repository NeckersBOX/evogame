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

export const buildRandomSolutionSkill = (skills, range) => skills.map(skill => ({
  key: skill.key,
  value: skill.value * range
}));

export const evaluateSolutionsFitness = (skills, solutions) => {
  const ranges = skills.map(skill => ({
    ...getSkillRange(skill.key, solutions),
    skill: skill.key
  }));

  return solutions.map(solution => ({
    ...solution,
    skills: solution.skills.map(skill => ({
      ...skill,
      fitness: skill.value / ranges.find(r => r.skill == skill.key).max
    }))
  }));
};

export const generateSolutionColor = skills => {
  let values = skills.map(s => s.fitness);
  let [ min, max ] = [ Math.min(values), Math.max(values) ];
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
      colors.push(colorRanges[i].color + ' ' + colorRanges[i - 1].value);
    }
  }

  return 'background: radial-gradient(' + colors.join(',') + ')';
};
