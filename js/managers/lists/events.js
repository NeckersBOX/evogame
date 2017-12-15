export default [
  {
    key: 'wind',
    label: 'Wind',
    affect: [ 'wind' ],
    min: 0,
    unit: 'km/h',
    labelEvaluate: 'evaluateWind'
  },
  {
    key: 'rain',
    label: 'Rain',
    affect: [ 'water', 'wind' ],
    min: 0,
    unit: 'mm',
    labelEvaluate: 'evaluateRain'
  },
  {
    key: 'sandstorm',
    label: 'Sandstorm',
    affect: [ 'heat', 'wind' ],
    min: 0,
    unit: 'km/h',
    labelEvaluate: 'evaluateSandstorm'
  },
  {
    key: 'snow',
    label: 'Snow',
    affect: [ 'cold', 'water' ],
    min: 0,
    unit: 'cm',
    labelEvaluate: 'evaluateSnow'
  },
  {
    key: 'tsunami',
    label: 'Tsunami',
    affect: [ 'water' ],
    min: 0,
    unit: 'm',
    labelEvaluate: 'evaluateTsunami'
  },
  {
    key: 'fire',
    label: 'Fire',
    affect: [ 'heat' ],
    min: 0,
    unit: '°C',
    labelEvaluate: 'evaluateFire'
  }
];
