const skills = [
  {
    key: 'cold',
    label: 'Cold Resistance [ °C ]',
    min: '-273',
    defaultValue: '-25',
    value: -25,
    fitness: 0
  },
  {
    key: 'heat',
    label: 'Heat Resistance [ °C ]',
    min: '-273',
    defaultValue: '45',
    value: 45,
    fitness: 0
  },
  {
    key: 'water',
    label: 'Water Resistance [ m ]',
    min: '0',
    defaultValue: '8',
    value: 8,
    fitness: 0
  },
  {
    key: 'wind',
    label: 'Wind Resistance [ km/h ]',
    min: '0',
    defaultValue: '90',
    value: 90,
    fitness: 0
  }
];

const skillReducer = (state, key, value) => ({
  ...state,
  skills: skills.map(p => (p.key != key) ? p : {...p, value})
});

export { skills, skillReducer };
