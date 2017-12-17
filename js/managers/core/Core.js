import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('core');

export class Core {
  constructor() {
    this.state = {};
  }

  getCurrentState() {
    const logPrefix = ':getCurrentState] ';
    logger.debug(logPrefix, '-->');

    logger.debug(logPrefix, '<--');
    return this.state;
  }
}

export class CoreList extends Core {
  constructor(list) {
    super();
    
    this.state = {
      ...this.state,
      list
    };
  }

  getList() {
    const logPrefix = ':getList] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return this.state.list;
  }

  getElementByKey(key) {
    const logPrefix = ':getElementByKey] ';
    logger.info(logPrefix, '-->');

    let skill = this.state.list.find(s => s.key == key);
    logger.debug(logPrefix, 'skill:', skill);

    logger.info(logPrefix, '<--');
    return skill;
  }

  setValueByKey(key, value) {
    const logPrefix = ':setValueByKey] ';
    logger.info(logPrefix, '-->');

    this.state.list = this.state.list.map(param => {
      if ( param.key != key ) {
        return param;
      }

      if ( param.hasOwnProperty('min') && +value < +param.min ) {
        logger.info(logPrefix, 'Prevent set a value less than minimum');
        return param;
      }

      if ( param.hasOwnProperty('max') && +value > +param.max ) {
        logger.info(logPrefix, 'Prevent set a value greater than maximum');
        return param;
      }

      if ( param.hasOwnProperty('lessThan') ) {
        logger.info(logPrefix, 'Property ' + param.key + ' must be less than ' + param.lessThan);
        let lessThanValue = this.getElementByKey(param.lessThan).value;

        if ( value >= lessThanValue ) {
          logger.info(logPrefix, 'Property not respected ( ' + value + ' >= ' + lessThanValue + ' )');
          return param;
        }
        else {
          logger.info(logPrefix, 'Property respected ( ' + value + ' < ' + lessThanValue + ' )');
        }
      }

      if ( param.hasOwnProperty('greaterThan') ) {
        logger.info(logPrefix, 'Property ' + param.key + ' must be greater than ' + param.greaterThan);
        let greaterThanValue = this.getElementByKey(param.greaterThan).value;

        if ( value <= greaterThanValue ) {
          logger.info(logPrefix, 'Property not respected ( ' + value + ' <= ' + greaterThanValue + ' )');
          return param;
        }
        else {
          logger.info(logPrefix, 'Property respected ( ' + value + ' > ' + greaterThanValue + ' )');
        }
      }

      return {...param, value};
    });

    logger.info(logPrefix, '<--');
    return this;
  }
}
