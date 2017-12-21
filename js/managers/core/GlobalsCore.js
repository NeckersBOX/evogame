import { Core } from './Core'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('globals');

class GlobalsCore extends Core {
  constructor() {
    super();
  }
}

export default GlobalsCore;
