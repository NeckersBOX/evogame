import parameters from './lists/parameters'
import { CoreList } from './Core'

import log from '../../loglevel-custom'
const logger = log.getLogger('parameters');

class ParametersCore extends CoreList {
  constructor() {
    super(parameters);
  }
}

export default ParametersCore;
