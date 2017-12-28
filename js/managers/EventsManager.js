import EventsCore from './core/EventsCore'
import LabelEvaluate from './static/LabelEvaluate'
import DamageEvaluate from './static/DamageEvaluate'
import { sumEqualsKey } from '../generics'


import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('events');

class EventsManager extends EventsCore {
  constructor() {
    super();

    this.state = {
      status: {
        sended: false,
        damages: {},
        duration: 0,
        passed: 0
      }
    };
  }

  sendEvent() {
    const logPrefix = ':sendEvent] ';
    logger.info(logPrefix, '-->');

    if ( !this.state.current ) {
      logger.warn(logPrefix, 'Element not found');
    }
    else if ( !DamageEvaluate.hasOwnProperty(this.state.current.damageEvaluate) ) {
      logger.warn(logPrefix, 'Method ' + this.state.current.damageEvaluate + ' not found.');
    }
    else {
      this.setState({
        status: {
          ...this.state.status,
          sended: true,
          duration: this.state.current.dispatchTime
        }
      });
    }

    logger.info(logPrefix, '<--');
    return this;
  }

  addDay(state) {
    const logPrefix = ':addDay] ';
    logger.info(logPrefix, '-->');

    if ( this.state.status.sended === false ) {
      logger.debug(logPrefix, 'No event sended');
    }
    else {
      if ( this.state.status.passed == this.state.status.duration ) {
        logger.info(logPrefix, 'Current event end');

        this.setState({
          status: {
            sended: false,
            passed: 0,
            duration: 0,
            damages: {}
          }
        });
      }

      let damages = DamageEvaluate[this.state.current.damageEvaluate](this.state.current.value);

      this.setState({
        status: {
          ...this.state.status,
          damages: sumEqualsKey(damages, this.state.status.damages),
          passed: this.state.status.passed + 1
        }
      });

      logger.debug(logPrefix, 'damages:', this.state.status.damages);

      state.managers.solutions.applyDamage(state.managers.skills, this.state.status.damages);

      if ( state.managers.solutions.getList().length == 0 ) {
        logger.info(logPrefix, 'No solutions left');
        state.managers.globals.pauseGame();

        this.setState({
          status: {
            sended: false,
            passed: 0,
            duration: 0,
            damages: {}
          }
        });
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
      logger.warn(logPrefix, 'Element not found');
    }
    else if ( !LabelEvaluate.hasOwnProperty(element.labelEvaluate) ) {
      logger.warn(logPrefix, 'Method ' + element.labelEvaluate + ' not found.');
    }
    else {
      valueInfo = LabelEvaluate[element.labelEvaluate](value);
    }

    logger.info(logPrefix, '<--');
    return valueInfo;
  }
}

export default EventsManager;
