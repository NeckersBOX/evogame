export default [
  {
    key: 'wind',
    label: 'Wind',
    affect: [ 'wind' ],
    min: 0,
    defaultValue: 20,
    dispatchTime: 2,
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
    dispatchTime: 7,
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
    dispatchTime: 60,
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
    dispatchTime: 3,
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
    dispatchTime: 14,
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
    dispatchTime: 30,
    unit: '°C',
    labelEvaluate: 'labelFire',
    damageEvaluate: 'damageFire'
  }
];
