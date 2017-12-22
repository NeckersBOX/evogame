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

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

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
          onChange={e => this.setState({ value: e.target.value })} />
        <label className="evogame--event-label mui--text-caption">
          {this.props.managers.events.getValueLabel(this.props.events.current.key, this.state.value)}
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
