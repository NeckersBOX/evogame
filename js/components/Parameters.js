import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bind } from 'decko'

import Input from 'preact-mui/lib/input'
import Row from 'preact-mui/lib/row'
import Col from 'preact-mui/lib/col'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = logger.getLogger('Parameters');

class Parameters extends Component {
  constructor(props) {
    super(props);
  }

  @bind
  changeParameter (event, key) {
    const logPrefix = ':changeParameter] ';
    event.preventDefault();
    logger.debug(logPrefix, '-->');

    if ( this.props.running && this.props.parameters.find(p => p.key == key).dynamic ) {
      logger.debug(logPrefix, 'Prevent to change value when running');
      logger.debug(logPrefix, '<--');
      return;
    }

    this.props.dispatch({
      type: 'SET_PARAMETERS',
      data: {
        key,
        value: event.target.value
      }
    });

    logger.debug(logPrefix, '<--');
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
      <div>
        <Row>
          {this.props.parameters.map(property =>
            <Col md="3" sm="6">
              <Input {...{
                ...property,
                label: (property.dynamic ? '' : '* ') + property.label + '[ ' + property.unit + ' ]'
              }} type="number" floatingLabel={true}
                onChange={e => this.changeParameter(e, property.key)} />
            </Col>
          )}
        </Row>
        <div className="muiextra--note"><b>*</b> Need restart to be applied</div>
      </div>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => state)(Parameters);
