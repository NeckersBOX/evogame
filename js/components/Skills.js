import { h } from 'preact'
import EvoComponent from './EvoComponent'
import State from '../managers/core/State'

import { connect } from 'preact-redux'
import { bind } from 'decko';

import Input from 'preact-mui/lib/input'
import Row from 'preact-mui/lib/row'
import Col from 'preact-mui/lib/col'

import log from '../loglevel-custom'
const logger = log.getLogger('Skills');

class Skills extends EvoComponent {
  constructor(props) {
    super(props);
  }

  @bind
  changeParameter (event, key) {
    const logPrefix = ':changeParameter] ';
    event.preventDefault();
    logger.info(logPrefix, '-->');

    if ( this.props.managers.skills.isDynamic(key) == false && this.props.globals.status == 'play' ) {
      logger.debug(logPrefix, 'Prevent to change dynamic parameters');
    }
    else {
      this.props.dispatch({
        type: 'SKILL_SET',
        data: {
          key,
          value: event.target.value
        }
      });
    }

    logger.info(logPrefix, '<--');
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
      <div>
        <Row>
          {this.props.skills.list.map(property => {
            logger.debug(logPrefix, 'Generating input for property', property);

            return (
              <Col key={property.key} md="6" sm="12">
                <Input type="number" floatingLabel={true}
                  label={property.label + ' [ ' + property.unit + ' ]'}
                  min={property.min || null}
                  max={property.max || null}
                  value={property.value}
                  onChange={e => this.changeParameter(e, property.key)} />
              </Col>
            );
          })}
        </Row>
        <div className="muiextra--note">This settings will be applied only for the first generation</div>
      </div>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => new State(state)
  .ignore([ 'events', 'parameters', 'solutions' ])
  .ignoreGlobals([ 'day', 'generation', 'timers' ]).state
)(Skills);;
