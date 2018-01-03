import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from './loglevel-prefix-template'

prefix.apply(log, prefixTemplate);

class CustomLog {
  constructor(logger) {
    this.logger = logger;
  }

  stringify(args) {
    let msgtok = args.slice(0);
    msgtok.shift();

    return msgtok.map(arg => {
      if ( (typeof arg == 'array' || typeof arg == 'object') ) {
        return ' ' + JSON.stringify(arg);
      }

      return arg;
    }).join('');
  }

  info(prefix) {
    if ( (process.env.logtostr == true) ) {
      this.logger.info(prefix, this.stringify(Array.from(arguments)));
    }
    else {
      this.logger.info.apply(this, arguments);
    }
  }

  warn(prefix) {
    if ( (process.env.logtostr == true) ) {
      this.logger.warn(prefix, this.stringify(Array.from(arguments)));
    }
    else {
      this.logger.warn.apply(this, arguments);
    }
  }

  debug(prefix) {
    if ( (process.env.logtostr == true) ) {
      this.logger.debug(prefix, this.stringify(Array.from(arguments)));
    }
    else {
      this.logger.debug.apply(this, arguments);
    }
  }

  error(prefix) {
    if ( (process.env.logtostr == true) ) {
      this.logger.error(prefix, this.stringify(Array.from(arguments)));
    }
    else {
      this.logger.error.apply(this, arguments);
    }
  }

  trace(prefix) {
    if ( (process.env.logtostr == true) ) {
      this.logger.trace(prefix, this.stringify(Array.from(arguments)));
    }
    else {
      this.logger.trace.apply(this, arguments);
    }
  }
}

export default class {
  static getLogger(moduleName) {
    return new CustomLog(log.getLogger(moduleName));
  }
}
