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
      fitness: skill.value * 100 / ranges.find(r => r.skill == skill.key).max
    }))
  }));
};

export const generateSolutionColor = skills => '#ff0000';
