import skills from './lists/skills'
import { CoreList } from './Core'

import log from '../../loglevel-custom'
const logger = log.getLogger('skills');

class SkillsCore extends CoreList {
  constructor() {
    super(skills);
  }
}

export default SkillsCore;
