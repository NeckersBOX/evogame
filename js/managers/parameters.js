import parameters from './lists/parameters'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('parametersManager');

class ParametersManager {
  constructor() {
    this.parametersList = parameters;
  }

  @memoize
  getList() {
    const logPrefix = ':getList] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return this.parametersList;
  }

  @memoize
  getParameterByKey(parameterKey) {
    const logPrefix = ':getParameterByKey] ';
    logger.info(logPrefix, '-->');

    let parameter = this.parametersList.find(s => s.key == parameterKey);
    logger.debug(logPrefix, 'parameter:', parameter);

    logger.info(logPrefix, '<--');
    return parameter;
  }
}

export default new ParametersManager();
