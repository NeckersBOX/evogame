import GlobalsCore from './core/GlobalsCore'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('globals');

class GlobalsManager extends GlobalsCore {
  constructor() {
    super();
  }

  
}

export default GlobalsManager;
