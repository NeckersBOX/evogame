import ParametersCore from './core/ParametersCore'

import log from '../loglevel-custom'
const logger = log.getLogger('parameters');

class ParametersManager extends ParametersCore {
  constructor() {
    super();
  }
}

export default ParametersManager;
