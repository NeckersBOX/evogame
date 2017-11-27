import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { ButtonsGroup, ButtonItem } from './extra-mui/buttons-group'

class Controller extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonsGroup>
        <ButtonItem active={this.props.status == 'play'}>
          <i className="fa fa-play" />
        </ButtonItem>
        <ButtonItem active={this.props.status == 'pause'}>
          <i className="fa fa-pause" />
        </ButtonItem>
        <ButtonItem active={this.props.status == 'stop'}>
          <i className="fa fa-stop" />
        </ButtonItem>
      </ButtonsGroup>
    );
  }
}

export default connect(state => state)(Controller);
