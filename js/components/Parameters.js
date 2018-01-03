import { h } from 'preact'
import EvoComponent from './EvoComponent'
import State from '../managers/core/State'

import { connect } from 'preact-redux'
import { bind } from 'decko'

import Input from 'preact-mui/lib/input'
import Row from 'preact-mui/lib/row'
import Col from 'preact-mui/lib/col'

import log from '../loglevel-custom'
const logger = log.getLogger('Parameters');

class Parameters extends EvoComponent {
  constructor(props) {
    super(props);
  }

  @bind
  changeParameter (event, key) {
    const logPrefix = ':changeParameter] ';
    event.preventDefault();
    logger.debug(logPrefix, '-->');

    if ( this.props.managers.parameters.isDynamic(key) && this.props.globals.status == 'play' ) {
      logger.debug(logPrefix, 'Prevent to change dynamic parameters');
    }
    else {
      this.props.dispatch({
        type: 'PARAMETER_SET',
        data: {
          key,
          value: event.target.value
        }
      });
    }

    logger.debug(logPrefix, '<--');
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
      <div>
        <Row>
          {this.props.parameters.list.map(property =>
            <Col md="6" sm="12">
              <Input {...{
                ...property,
                label: (property.dynamic ? '' : '* ') + property.label + ' [ ' + property.unit + ' ]'
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

export default connect(state => new State(state)
  .ignore([ 'events', 'skills', 'solutions' ])
  .ignoreGlobals([ 'day', 'generation', 'timers' ]).state
)(Parameters);
