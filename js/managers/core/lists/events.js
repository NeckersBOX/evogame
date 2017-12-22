export default [
  {
    key: 'wind',
    label: 'Wind',
    affect: [ 'wind' ],
    min: 0,
    defaultValue: 20,
    unit: 'km/h',
    labelEvaluate: 'labelWind',
    damageEvaluate: 'damageWind'
  },
  {
    key: 'rain',
    label: 'Rain',
    affect: [ 'water', 'wind' ],
    min: 0,
    defaultValue: 5,
    unit: 'mm/h',
    labelEvaluate: 'labelRain',
    damageEvaluate: 'damageRain'
  },
  {
    key: 'sandstorm',
    label: 'Sandstorm',
    affect: [ 'heat', 'cold', 'wind' ],
    min: 0,
    defaultValue: 10,
    unit: 'km/h',
    labelEvaluate: 'labelSandstorm',
    damageEvaluate: 'damageSandstorm'
  },
  {
    key: 'snow',
    label: 'Snow',
    affect: [ 'cold', 'heat' ],
    min: 0,
    defaultValue: 4,
    unit: 'cm/h',
    labelEvaluate: 'labelSnow',
    damageEvaluate: 'damageSnow'
  },
  {
    key: 'wave',
    label: 'Wave',
    affect: [ 'water' ],
    min: 0,
    defaultValue: 4,
    unit: 'm',
    labelEvaluate: 'labelWave',
    damageEvaluate: 'damageWave'
  },
  {
    key: 'fire',
    label: 'Fire',
    affect: [ 'heat', 'cold' ],
    min: 0,
    defaultValue: 40,
    unit: '°C',
    labelEvaluate: 'labelFire',
    damageEvaluate: 'damageFire'
  }
];
