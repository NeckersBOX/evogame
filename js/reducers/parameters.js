import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('parameters');

const parameters = [
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
    defaultValue: '365',
    value: 365
  },
  {
    key: 'mutability',
    dynamic: true,
    label: 'Mutability',
    unit: '%',
    min: '0',
    max: '100',
    defaultValue: '2',
    value: 2
  },
  {
    key: 'reproductivity',
    dynamic: true,
    label: 'Reproductivity',
    unit: '%',
    min: '0',
    max: '100',
    defaultValue: '0',
    value: 0
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
    defaultValue: '500',
    value: 500
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
    key: 'initial-range',
    dynamic: false,
    label: 'Initial Mutability Range',
    unit: '%',
    min: '0',
    max: '100',
    defaultValue: '20',
    value: 20
  }
];

const paramReducer = (state, key, value) => {
  const logPrefix = ':paramReducer] ';
  logger.info(logPrefix, '-->');

  logger.debug(logPrefix, 'key:', key, 'value:', value);

  logger.info(logPrefix, '<--');
  return ({
    ...state,
    parameters: parameters.map(p => (p.key != key ) ? p : {...p, value})
  });
};

export { parameters, paramReducer };
