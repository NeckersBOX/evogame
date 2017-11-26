import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bind } from 'decko';

import Input from 'preact-mui/lib/input'
import Row from 'preact-mui/lib/row'
import Col from 'preact-mui/lib/col'

class Parameters extends Component {
  constructor(props) {
    super(props);
  }

  @bind
  changeParameter (event, key) {
    event.preventDefault();

    if ( this.props.running && this.props.parameters.find(p => p.key == key).dynamic ) {
      return;
    }

    this.props.dispatch({
      type: 'SET_PARAMETERS',
      data: {
        key,
        value: event.target.value
      }
    });
  }

  render() {
    return (
      <div>
        <Row>
          {this.props.parameters.map(property =>
            <Col md="3" sm="6">
              <Input {...{
                ...property,
                label: (property.dynamic ? '' : '* ') + property.label
              }} type="number" floatingLabel={true}
                onChange={e => this.changeParameter(e, property.key)} />
            </Col>
          )}
        </Row>
        <div className="muiextra--note"><b>*</b> Need restart to be applied</div>
      </div>
    );
  }
}

export default connect(state => state)(Parameters);
