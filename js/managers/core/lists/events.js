export default [
  {
    key: 'wind',
    label: 'Wind',
    affect: [ 'wind' ],
    min: 0,
    defaultValue: 20,
    unit: 'km/h',
    labelEvaluate: 'evaluateWind'
  },
  {
    key: 'rain',
    label: 'Rain',
    affect: [ 'water', 'wind' ],
    min: 0,
    defaultValue: 5,
    unit: 'mm/h',
    labelEvaluate: 'evaluateRain'
  },
  {
    key: 'sandstorm',
    label: 'Sandstorm',
    affect: [ 'heat', 'wind' ],
    min: 0,
    defaultValue: 10,
    unit: 'km/h',
    labelEvaluate: 'evaluateSandstorm'
  },
  {
    key: 'snow',
    label: 'Snow',
    affect: [ 'cold' ],
    min: 0,
    defaultValue: 4,
    unit: 'cm/h',
    labelEvaluate: 'evaluateSnow'
  },
  {
    key: 'wave',
    label: 'Wave',
    affect: [ 'water' ],
    min: 0,
    defaultValue: 4,
    unit: 'm',
    labelEvaluate: 'evaluateWave'
  },
  {
    key: 'fire',
    label: 'Fire',
    affect: [ 'heat' ],
    min: 0,
    defaultValue: 40,
    unit: '°C',
    labelEvaluate: 'evaluateFire'
  }
];
