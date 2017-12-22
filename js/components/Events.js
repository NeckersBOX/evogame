import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Form from 'preact-mui/lib/form'
import Select from 'preact-mui/lib/select'
import Option from 'preact-mui/lib/option'
import Input from 'preact-mui/lib/input'
import Button from 'preact-mui/lib/button'

import { bind } from 'decko'
import { Badges } from './extra-mui/badges'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Events');

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.events.current.defaultValue
    };
  }

  @bind
  changeEvent(e) {
    this.props.dispatch({
      type: 'EVENT_SET',
      data: e.target.value
    });
  }

  @bind
  sendEvent(e) {
    e.preventDefault();

    this.props.dispatch({
      type: 'EVENT_SEND',
      data: {
        value: this.state.value
      }
    });
  }

  @bind
  changeValue(e) {
    const logPrefix = ':changeValue] ';
    logger.info(logPrefix, '-->');
    e.preventDefault();

    let [event, value] = [this.props.events.current, +e.target.value];

    if ( event.hasOwnProperty('min') && value < event.min ) {
      logger.info(logPrefix, 'Prevent to set a value less than minimum.');
      value = event.min;
    }

    if ( event.hasOwnProperty('max') && value > event.max ) {
      logger.info(logPrefix, 'Prevent to set a value more than maximum.');
      value = event.max;
    }

    this.setState({ value });
    logger.info(logPrefix, '<--');
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    logger.debug(logPrefix, 'Get label for current event\'s value');
    let label = this.props.managers.events.getValueLabel(this.props.events.current.key, this.state.value);
    logger.debug(logPrefix, 'Label retrieved:', label);

    let stage = (
      <Form>
        <Badges label="Affect" badges={this.props.events.current.affect} />
        <Select name="evogame-event" label="Event Type" defaultValue={this.props.events.current.key} onChange={this.changeEvent}>
          {this.props.events.list.map(event =>
            <Option value={event.key} label={event.label} />
          )}
        </Select>
        <Input type="number" floatingLabel={true}
          label={this.props.events.current.label + ' [ ' + this.props.events.current.unit + ' ]'}
          min={this.props.events.current.min || null}
          max={this.props.events.current.max || null}
          value={this.state.value}
          onChange={this.changeValue} />
        <label className="evogame--event-label mui--text-caption">
          {label}
        </label>
        <Button color="primary" style={{ width: '100%' }} raised={true}
          disabled={this.props.globals.status != 'play'}
          onClick={this.sendEvent}>
          Send Event
        </Button>
      </Form>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => state)(Events);
