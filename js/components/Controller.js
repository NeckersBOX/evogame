import { h } from 'preact'
import EvoComponent from './EvoComponent'
import State from '../managers/core/State'

import { connect } from 'preact-redux'
import { ButtonsGroup, ButtonItem } from './extra-mui/buttons-group'
import { bind } from 'decko'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Controller');

class Controller extends EvoComponent {
  constructor(props) {
    super(props);
  }

  @bind
  play() {
    this.props.dispatch({
      type: 'GLOBAL_PLAY_GAME',
      data: () => this.props.dispatch({
        type: 'GLOBAL_ADD_DAY',
        data: null
      })
    });
  }

  @bind
  pause() {
    this.props.dispatch({
      type: 'GLOBAL_PAUSE_GAME',
      data: null
    });
  }

  @bind
  stop() {
    this.props.dispatch({
      type: 'GLOBAL_STOP_GAME',
      data: null
    });
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
      <ButtonsGroup>
        <ButtonItem active={this.props.globals.status == 'play'} onClick={this.play}>
          <i className="fa fa-play" />
        </ButtonItem>
        <ButtonItem active={this.props.globals.status == 'pause'} onClick={this.pause}>
          <i className="fa fa-pause" />
        </ButtonItem>
        <ButtonItem active={this.props.globals.status == 'stop'} onClick={this.stop}>
          <i className="fa fa-stop" />
        </ButtonItem>
      </ButtonsGroup>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => new State(state)
  .ignore([ 'events', 'parameters', 'skills', 'solutions' ])
  .ignoreGlobals([ 'day', 'generation', 'timers' ]).state
)(Controller);
