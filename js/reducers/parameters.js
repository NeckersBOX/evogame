const parameters = [
  {
    key: 'solutions',
    label: 'Solutions',
    min: '1',
    defaultValue: '16',
    value: 16
  },
  {
    key: 'days_per_generation',
    label: 'Generation duration [ days ]',
    min: '1',
    defaultValue: '365',
    value: 365
  },
  {
    key: 'mutability',
    label: 'Mutability [ % ]',
    min: '0',
    max: '100',
    defaultValue: '2',
    value: 2
  },
  {
    key: 'reproductivity',
    label: 'Reproductivity [ % ]',
    min: '0',
    max: '100',
    defaultValue: '0',
    value: 0
  },
  {
    key: 'world-width',
    label: 'World Width [ cell ]',
    min: '1',
    defaultValue: '32',
    value: 32
  },
  {
    key: 'world-height',
    label: 'World Height [ cell ]',
    min: '1',
    defaultValue: '12',
    value: 12
  },
  {
    key: 'day_time',
    label: 'Day duration [ ms ]',
    min: '10',
    defaultValue: '500',
    value: 500
  }
];

const paramReducer = (state, key, value) => ({
  ...state,
  parameters: parameters.map(p => (p.key != key) ? p : {...p, value})
});

export { parameters, paramReducer };
