import ParametersCore from './core/parameters'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('parametersManager');

class ParametersManager extends ParametersCore {
  constructor() {
    super();
  }
}

export default new ParametersManager();