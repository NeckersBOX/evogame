const skills = [
  {
    label: 'Cold Resistance [ °C ]',
    min: '-273',
    defaultValue: '-25',
    value: -25
  },
  {
    label: 'Heat Resistance [ °C ]',
    min: '-273',
    defaultValue: '45',
    value: 45
  },
  {
    label: 'Water Resistance [ m ]',
    min: '0',
    defaultValue: '8',
    value: 8
  },
  {
    label: 'Wind Resistance [ km/h ]',
    min: '0',
    defaultValue: '90',
    value: 90
  }
];

const skillReducer = (state, label, value) => ({
  ...state,
  skills: skills.map(p => (p.label != label) ? p : {...p, value})
});

export { skills, skillReducer };
