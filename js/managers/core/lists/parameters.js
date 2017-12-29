export default [
  {
    key: 'solutions',
    dynamic: false,
    label: 'Solutions',
    unit: 'n',
    min: '1',
    defaultValue: '16',
    value: 16
  },
  {
    key: 'days_per_generation',
    dynamic: true,
    label: 'Generation duration',
    unit: 'days',
    min: '1',
    defaultValue: '30',
    value: 30
  },
  {
    key: 'mutability',
    dynamic: true,
    label: 'Mutability',
    unit: '%',
    min: '0',
    max: '100',
    defaultValue: '20',
    value: 20
  },
  {
    key: 'reproductivity',
    dynamic: true,
    label: 'Reproductivity',
    unit: '%',
    min: '0',
    max: '100',
    defaultValue: '80',
    value: 80
  },
  {
    key: 'world-width',
    dynamic: true,
    label: 'World Width',
    unit: 'cell',
    min: '1',
    defaultValue: '32',
    value: 32
  },
  {
    key: 'world-height',
    dynamic: true,
    label: 'World Height',
    unit: 'cell',
    min: '1',
    defaultValue: '12',
    value: 12
  },
  {
    key: 'day_time',
    dynamic: true,
    label: 'Day duration',
    unit: 'ms',
    min: '10',
    defaultValue: '300',
    value: 300
  },
  {
    key: 'reproduction-area',
    dynamic: true,
    label: 'Reproduction Area',
    unit: 'cell',
    min: '1',
    defaultValue: '6',
    value: 6
  },
  {
    key: 'day-mutability',
    dynamic: true,
    label: 'Day Mutability Range',
    unit: '%',
    min: '0',
    max: '100',
    defaultValue: '2',
    value: 5
  }
];
