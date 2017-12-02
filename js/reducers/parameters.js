const parameters = [
  {
    key: 'solutions',
    dynamic: false,
    label: 'Solutions',
    min: '1',
    defaultValue: '16',
    value: 16
  },
  {
    key: 'days_per_generation',
    dynamic: true,
    label: 'Generation duration [ days ]',
    min: '1',
    defaultValue: '365',
    value: 365
  },
  {
    key: 'mutability',
    dynamic: true,
    label: 'Mutability [ % ]',
    min: '0',
    max: '100',
    defaultValue: '2',
    value: 2
  },
  {
    key: 'reproductivity',
    dynamic: true,
    label: 'Reproductivity [ % ]',
    min: '0',
    max: '100',
    defaultValue: '0',
    value: 0
  },
  {
    key: 'world-width',
    dynamic: true,
    label: 'World Width [ cell ]',
    min: '1',
    defaultValue: '32',
    value: 32
  },
  {
    key: 'world-height',
    dynamic: true,
    label: 'World Height [ cell ]',
    min: '1',
    defaultValue: '12',
    value: 12
  },
  {
    key: 'day_time',
    dynamic: true,
    label: 'Day duration [ ms ]',
    min: '10',
    defaultValue: '500',
    value: 500
  },
  {
    key: 'reproduction-area',
    dynamic: true,
    label: 'Reproduction Area [ cell ]',
    min: '1',
    defaultValue: '6',
    value: 6
  },
  {
    key: 'initial-range',
    dynamic: false,
    label: 'Initial Mutability Range [ % ]',
    min: '0',
    max: '100',
    defaultValue: '20',
    value: 20
  }
];

const paramReducer = (state, key, value) => ({
  ...state,
  parameters: parameters.map(p => (p.key != key ) ? p : {...p, value})
});

export { parameters, paramReducer };
