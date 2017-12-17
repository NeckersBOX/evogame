import parameters from './lists/parameters'
import { CoreList } from './Core'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('parameters');

class ParametersCore extends CoreList {
  constructor() {
    super(parameters);
  }
}

export default ParametersCore;
