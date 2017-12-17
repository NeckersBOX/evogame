import GlobalsCore from './core/GlobalsCore'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('globals');

class GlobalsManager extends GlobalsCore {
  constructor() {
    super();

    this.state = {
      day: 0,
      generation: 0,
      timers: {
        day: null
      },
      status: 'stop',
      initialized: false,
      solutions: null // TODO
    }
  }

  stop() {
    const logPrefix = ':stop] ';
    logger.info(logPrefix, '-->');

    if ( this.state.status == 'stop' ) {
      logger.debug(logPrefix, 'Already stopped');
      logger.info(logPrefix, '<--');
      return this;
    }

    logger.info(logPrefix, 'Reset world');
    this.setState({
      status: 'stop',
      day: 0,
      generation: 0,
      initialized: false,
      solutions: null // TODO
    });

    logger.info(logPrefix, 'Clear intervals');
    clearInterval(this.state.timers.day);

    logger.info(logPrefix, '<--');
    return this;
  }

  pause() {
    const logPrefix = ':pause] ';
    logger.info(logPrefix, '-->');

    if ( state.status != 'play' ) {
      logger.debug(logPrefix, 'Nothing to pause');
      logger.info(logPrefix, '<--');
      return this;
    }

    this.setState({ status: 'pause' });

    logger.info(logPrefix, 'Clearing intervals');
    clearInterval(this.state.timers.day);

    logger.info(logPrefix, '<--');
    return this;
  }
}

export default GlobalsManager;
