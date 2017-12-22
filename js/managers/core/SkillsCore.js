import skills from './lists/skills'
import { CoreList } from './Core'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('skills');

class SkillsCore extends CoreList {
  constructor() {
    super(skills);
  }
}

export default SkillsCore;
