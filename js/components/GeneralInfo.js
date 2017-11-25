import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import Panel from 'preact-mui/lib/panel'

class GeneralInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel>
        <div className="mui--text-title">General Status</div>
        <div className="evogame-info-item">
          <b>Generation:</b> <span>{this.props.generation}</span>
        </div>
        <div className="evogame-info-item">
          <b>Solutions:</b> <span>{this.props.solutions}</span>
        </div>
        <div className="evogame-info-item">
          <b>Day:</b> <span>{this.props.day}</span>
        </div>
      </Panel>
    );
  }
}

export default connect(state => state)(GeneralInfo);
