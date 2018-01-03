import { Core } from './Core'
import { compareObjects, getRandomInt } from '../../generics'

import log from '../../loglevel-custom'
const logger = log.getLogger('solutions');

class SolutionsCore extends Core {
  constructor() {
    super();

    this.state = {
      list: [],
      dead: 0
    };
  }

  addSolution(skills, position) {
    const logPrefix = ':addSolution] ';
    logger.info(logPrefix, '-->');

    let list = this.state.list;

    list.push({
      skills,
      position
    });

    this.setState({ list });

    logger.info(logPrefix, '<--');
    return this;
  }

  removeAll() {
    const logPrefix = ':removeAll] ';
    logger.info(logPrefix, '-->');

    this.setState({ list: [], dead: 0 });

    logger.info(logPrefix, '<--');
    return this;
  }

  removeSolutionAt(position) {
    const logPrefix = ':removeSolutionAt] ';
    logger.info(logPrefix, '-->');

    let list = this.state.list.filter(solution => !compareObjects(solution.position, position));
    this.setState({
      list,
      dead: this.state.dead + (this.state.list.length - list.length)
    });

    logger.info(logPrefix, '<--');
    return this;
  }

  getList() {
    const logPrefix = ':getList] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return this.state.list;
  }

  getSolutionAt(position) {
    const logPrefix = ':getSolutionAt] ';
    logger.trace(logPrefix, '-->');

    let solution = this.state.list.find(s => s.position.x == position.x && s.position.y == position.y);

    logger.trace(logPrefix, '<--');
    return (solution === undefined) ? null : solution;
  }

  getSkillRangeByKey(key) {
    const logPrefix = ':getSkillRange] ';
    logger.debug(logPrefix, '-->');
    logger.debug(logPrefix, 'Skill key:', key);

    let range = {
      min: undefined,
      max: undefined
    };

    for ( let i in this.state.list ) {
      let currSkillValue = this.state.list[i].skills.find(s => s.key == key).value;
      logger.debug(logPrefix, 'currSkillValue:', currSkillValue, 'at Index:', i);

      if ( range.min == undefined || currSkillValue < range.min ) {
        range.min = currSkillValue;
      }

      if ( range.max == undefined || currSkillValue > range.max ) {
        range.max = currSkillValue;
      }
    }

    logger.debug(logPrefix, '<--');
    return range;
  }

  getFreePositionInArea(pos, width, height, area) {
    const logPrefix = ':getFreePositionInArea] ';
    logger.debug(logPrefix, '-->');

    let [ start, end ] = [
      {
        x: ((pos.x - area) < 0) ? 0 : pos.x - area,
        y: ((pos.y - area) < 0) ? 0 : pos.y - area
      },
      {
        x: ((pos.x + area) > width) ? width : pos.x + area,
        y: ((pos.y + area) > height) ? height : pos.y + area
      }
    ];

    logger.debug(logPrefix, 'start:', start);
    logger.debug(logPrefix, 'end:', end);

    let emptyPos = [];
    for ( let x = start.x; x < end.x; x++ ) {
      for ( let y = start.y; y < end.y; y++ ) {
        if ( this.getSolutionAt({ x, y }) === null ) {
          emptyPos.push({ x, y });
        }
      }
    }
    logger.debug(logPrefix, 'empty cells:', emptyPos)

    logger.debug(logPrefix, '<--');
    return emptyPos;
  }

  generateSolutionChild(mom, dad, mutability) {
    const logPrefix = ':generateSolutionChildren] ';
    logger.debug(logPrefix, '-->');

    let child = [];
    for ( let key in mom ) {
      let side = getRandomInt(0, 100) / 100;

      let baseValue = Math.ceil(((mom[key].value * side) + (dad[key].value * (1 - side))) / 2);
      let range = baseValue * (mutability / 100);

      child.push({
        ...mom[key],
        value: baseValue + getRandomInt(-range, +range),
        fitness: 0
      });
    }
    logger.debug(logPrefix, 'Something happened from mom', mom, 'and dad', dad);
    logger.debug(logPrefix, 'It\'s a ' + (getRandomInt(0, 1) ? 'boy' : 'girl') + ':', child);

    logger.debug(logPrefix, '<--');
    return child;
  }

  processOverpopulation(width, height, area) {
    const logPrefix = ':processOverpopulation] ';
    logger.info(logPrefix, '-->');

    let dead = 0;
    let list = this.state.list;
    list.map(solution => {
      let freePos = this.getFreePositionInArea(solution.position, width, height, area).length;

      if ( freePos == 0 ) {
        this.removeSolutionAt(solution.position);
        dead++;
        return false;
      }

      return true;
    });
    logger.info(logPrefix, 'During overpopulation', dead, 'are passed away');

    this.setState({
      dead: this.state.dead + dead
    });

    logger.info(logPrefix, '<--');
    return this;
  }

  reproduceSolutions(width, height, range, area, mutability) {
    const logPrefix = ':reproduceSolutions] ';
    logger.debug(logPrefix, '-->');

    let born = 0;
    let list = this.state.list;
    list.map((dad, idx) => {
      if ( getRandomInt(0, 100) > range ) {
        logger.debug(logPrefix, 'Missed reproduction due to fate');
        return dad;
      }

      let randIdx = getRandomInt(0, list.length - 1);
      while ( randIdx == idx ) {
        randIdx = getRandomInt(0, list.length - 1);
      }

      let couplingPos = {
        x: Math.ceil((dad.position.x + list[randIdx].position.x) / 2),
        y: Math.ceil((dad.position.y + list[randIdx].position.y) / 2)
      };
      let freePos = this.getFreePositionInArea(couplingPos, width, height, area);

      if ( freePos.length == 0 ) {
        logger.debug(logPrefix, 'A new born missed due to no space in', couplingPos);
        return dad;
      }

      this.addSolution(
        this.generateSolutionChild(list[randIdx].skills, dad.skills, mutability),
        freePos[getRandomInt(0, freePos.length - 1)]
      );

      born++;
      return dad;
    });
    logger.info(logPrefix, born ? (born + ' solutions are born :D') : 'No solution are born');

    logger.info(logPrefix, '<--');
    return this;
  }
}

export default SolutionsCore;
