import { h } from 'preact'
import { connect } from 'preact-redux'
import EvoComponent from './EvoComponent'

import Form from 'preact-mui/lib/form'
import Select from 'preact-mui/lib/select'
import Option from 'preact-mui/lib/option'
import Input from 'preact-mui/lib/input'
import Button from 'preact-mui/lib/button'

import { bind } from 'decko'
import { Badges } from './extra-mui/badges'
import { List, ListItem } from './extra-mui/list'
import State from '../managers/core/State'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Events');

const EventStatus = props => (
  <List>
    <ListItem label="Day Passed">{props.status.passed}</ListItem>
    {Object.keys(props.status.damages).map(key =>
      <ListItem label={'Damage ' + key}>{props.status.damages[key]}</ListItem>
    )}
  </List>
);

class Events extends EvoComponent {
  constructor(props) {
    super(props);
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
      data: null
    });
  }

  @bind
  changeValue(e) {
    e.preventDefault();

    this.props.dispatch({
      type: 'EVENT_SET_VALUE',
      data: +e.target.value
    });
  }

  @bind
  changeTime(e) {
    e.preventDefault();

    this.props.dispatch({
      type: 'EVENT_SET_TIME',
      data: +e.target.value
    });
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    logger.debug(logPrefix, 'Get label for current event\'s value');
    let label = this.props.managers.events.getValueLabel(this.props.events.current.key, this.props.events.current.value);
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
          value={this.props.events.current.value}
          onChange={this.changeValue} />
        <label className="evogame--event-label mui--text-caption">
          {label}
        </label>
        <Input type="number" floatingLabel={true}
          label={this.props.config.label.time + ' [ ' + this.props.config.unit.time + ' ]'}
          min={0}  value={this.props.events.current.dispatchTime}
          onChange={this.changeTime} />
        {this.props.events.status.sended ? <EventStatus status={this.props.events.status} /> : null}
        <Button color="primary" style={{ width: '100%' }} raised={true}
          disabled={this.props.globals.status != 'play' || this.props.events.status.sended}
          onClick={this.sendEvent}>
          Send Event
        </Button>
      </Form>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => new State(state)
  .ignore(['skills', 'parameters', 'solutions' ])
  .ignoreGlobals([ 'day', 'generation', 'timers' ]).state
)(Events);
