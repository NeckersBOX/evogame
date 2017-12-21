import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('core');

export class Core {
  constructor() {
    this._state = {};
  }

  set state(state) {
    this._state = {...this._state, ...state};
  }

  get state() {
    return this._state;
  }

  setState(state) {
    this.state = state;
    return this;
  }

  getCurrentState() {
    const logPrefix = ':getCurrentState] ';
    logger.debug(logPrefix, '-->');
    logger.trace(logPrefix, this.state);
    logger.debug(logPrefix, '<--');
    return this.state;
  }
}

export class CoreList extends Core {
  constructor(list) {
    super();

    this.state = {
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

    let elem = this.state.list.find(e => e.key == key);
    logger.debug(logPrefix, 'key:', key, 'element:', elem);

    logger.info(logPrefix, '<--');
    return elem;
  }

  getValueByKey(key) {
    const logPrefix = ':getValueByKey] ';
    logger.info(logPrefix, '-->');

    let value = this.getElementByKey(key).value;

    logger.info(logPrefix, '<--');
    return value;
  }

  setValueByKey(key, value) {
    const logPrefix = ':setValueByKey] ';
    logger.info(logPrefix, '-->');
    logger.debug(logPrefix, 'key:', key, 'value:', value);

    this.setState({
      list: this.state.list.map(param => {
        if ( param.key != key ) {
          return param;
        }
        logger.debug(logPrefix, 'Element found:', param);

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

        logger.debug('Element returned:', {...param, value});
        return {...param, value};
      })
    });

    logger.info(logPrefix, '<--');
    return this;
  }

  isDynamic(key) {
    const logPrefix = ':isDynamic] ';
    logger.debug(logPrefix, '-->');

    let [answer, param] = [ true, this.getElementByKey(key) ];

    if ( param.hasOwnProperty('dynamic') ) {
      answer = param.dynamic;
    }

    logger.debug(logPrefix, '<--');
    return answer;
  }
}
