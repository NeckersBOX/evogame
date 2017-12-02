import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { ButtonsGroup, ButtonItem } from './extra-mui/buttons-group'
import { bind } from 'decko'

class Controller extends Component {
  constructor(props) {
    super(props);
  }

  @bind
  play() {
    this.props.dispatch({
      type: 'PLAY_GAME',
      data: null
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
    return (
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
  }
}

export default connect(state => state)(Controller);
