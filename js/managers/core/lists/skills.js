export default [
  {
    key: 'cold',
    label: 'Cold Resistance',
    unit: '°C',
    min: '-273',
    defaultValue: '-25',
    lessThan: 'heat',
    value: -25,
    fitness: 0,
    color: '#E0E0E0',
    generateFitness: 'fitnessCold',
    isFatal: 'isFatalCold'
  },
  {
    key: 'heat',
    label: 'Heat Resistance',
    unit: '°C',
    min: '-273',
    defaultValue: '45',
    greaterThan: 'cold',
    value: 45,
    fitness: 0,
    color: '#ED6A5A',
    generateFitness: 'fitnessHeat',
    isFatal: 'isFatalHeat'
  },
  {
    key: 'water',
    label: 'Water Resistance',
    unit: 'm',
    min: '0',
    defaultValue: '8',
    value: 8,
    fitness: 0,
    color: '#9BC1BC',
    generateFitness: 'fitnessWater',
    isFatal: 'isFatalWater'
  },
  {
    key: 'wind',
    label: 'Wind Resistance',
    unit: 'km/h',
    min: '0',
    defaultValue: '90',
    value: 90,
    fitness: 0,
    color: '#8A84E2',
    generateFitness: 'fitnessWind',
    isFatal: 'isFatalWind'
  }
];
