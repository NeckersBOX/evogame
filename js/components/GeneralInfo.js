import { h, Component } from 'preact'
import { connect } from 'preact-redux';

class GeneralInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="evogame-status">
        <h1>General Status</h1>
        <div className="evogame-info-item">
          <b>Generation:</b> <span>{this.props.generation}</span>
        </div>
        <div className="evogame-info-item">
          <b>Solutions:</b> <span>{this.props.solutions}</span>
        </div>
        <div className="evogame-info-item">
          <b>Day:</b> <span>{this.props.day}</span>
        </div>
        <hr />
      </div>
    );
  }
}

export default connect(state => state)(GeneralInfo);
