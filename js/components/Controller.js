import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { ButtonsGroup, ButtonItem } from './extra-mui/buttons-group'
import { bind } from 'decko'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Controller');

class Controller extends Component {
  constructor(props) {
    super(props);
  }

  @bind
  play() {
    this.props.dispatch({
      type: 'PLAY_GAME',
      data: () => this.props.dispatch({
        type: 'ADD_DAY',
        data: null
      })
    });
  }

  @bind
  pause() {
    this.props.dispatch({
      type: 'PAUSE_GAME',
      data: null
    });
  }

  @bind
  stop() {
    this.props.dispatch({
      type: 'STOP_GAME',
      data: null
    });
  }

  render() {
    const logPrefix = ':render] ';
    logger.debug(logPrefix, '-->');

    let stage = (
      <ButtonsGroup>
        <ButtonItem active={this.props.status == 'play'} onClick={this.play}>
          <i className="fa fa-play" />
        </ButtonItem>
        <ButtonItem active={this.props.status == 'pause'} onClick={this.pause}>
          <i className="fa fa-pause" />
        </ButtonItem>
        <ButtonItem active={this.props.status == 'stop'} onClick={this.stop}>
          <i className="fa fa-stop" />
        </ButtonItem>
      </ButtonsGroup>
    );

    logger.debug(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => state)(Controller);
