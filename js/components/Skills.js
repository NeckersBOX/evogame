import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bind } from 'decko';

import Input from 'preact-mui/lib/input'
import Row from 'preact-mui/lib/row'
import Col from 'preact-mui/lib/col'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Skills');

class Skills extends Component {
  constructor(props) {
    super(props);
  }

  @bind
  changeParameter (event, key) {
    const logPrefix = ':changeParameter] ';
    event.preventDefault();
    logger.info(logPrefix, '-->');

    this.props.dispatch({
      type: 'SET_SKILLS',
      data: {
        key,
        value: event.target.value
      }
    });

    logger.info(logPrefix, '<--');
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
      <div>
        <Row>
          {this.props.skills.map(property => {
            logger.debug(logPrefix, 'Generating input for property', property);

            return (
              <Col key={property.key} md="3" sm="6">
                <Input type="number" floatingLabel={true}
                  label={property.label + '[ ' + property.unit + ' ]'}
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

export default connect(state => state)(Skills);;
