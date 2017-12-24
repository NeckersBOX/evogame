import EventsCore from './core/EventsCore'
import LabelEvaluate from './static/LabelEvaluate'
import DamageEvaluate from './static/DamageEvaluate'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('events');

class EventsManager extends EventsCore {
  constructor() {
    super();
  }

  sendEvent(state) {
    const logPrefix = ':sendEvent] ';
    logger.info(logPrefix, '-->');

    if ( !this.state.current ) {
      logger.info(logPrefix, 'Element not found');
    }
    else if ( !DamageEvaluate.hasOwnProperty(this.state.current.damageEvaluate) ) {
      logger.info(logPrefix, 'Method ' + this.state.current.damageEvaluate + ' not found.');
    }
    else {
      let damage = DamageEvaluate[this.state.current.damageEvaluate](this.state.current.value);
      logger.info(logPrefix, 'damages:', damage);

      state.managers.solutions.applyDamage(state.managers.skills, damage);

      if ( state.managers.solutions.getList().length == 0 ) {
        logger.info(logPrefix, 'No solutions left');
        state.managers.globals.pauseGame();
      }
    }

    logger.info(logPrefix, '<--');
    return this;
  }

  getValueLabel(key, value) {
    const logPrefix = ':getValueLabel] ';
    logger.info(logPrefix, '-->');

    let element = this.getElementByKey(key);
    let valueInfo = 'undefined';

    if ( !element ) {
      logger.info(logPrefix, 'Element not found');
    }
    else if ( !LabelEvaluate.hasOwnProperty(element.labelEvaluate) ) {
      logger.info(logPrefix, 'Method ' + element.labelEvaluate + ' not found.');
    }
    else {
      valueInfo = LabelEvaluate[element.labelEvaluate](value);
    }

    logger.info(logPrefix, '<--');
    return valueInfo;
  }
}

export default EventsManager;
