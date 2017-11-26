const parameters = [
  {
    label: 'Solutions',
    min: '1',
    defaultValue: '16',
    value: 16
  },
  {
    label: 'Days per generation',
    min: '1',
    defaultValue: '365',
    value: 365
  },
  {
    label: 'Mutability [ % ]',
    min: '0',
    max: '100',
    defaultValue: '2',
    value: 2
  },
  {
    label: 'Reproductivity [ % ]',
    min: '0',
    max: '100',
    defaultValue: '0',
    value: 0
  }
];

const paramReducer = (state, label, value) => ({
  ...state,
  parameters: parameters.map(p => (p.label != label) ? p : {...p, value})
});

export { parameters, paramReducer };
