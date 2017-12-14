import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Form from 'preact-mui/lib/form'
import Select from 'preact-mui/lib/select'
import Option from 'preact-mui/lib/option'
import Input from 'preact-mui/lib/input'
import Button from 'preact-mui/lib/button'

import { Badges } from './extra-mui/badges'
import EventsManager from '../managers/events'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Events');

class Events extends Component {
  constructor(props) {
    super(props);
    const logPrefix = ':constructor] ';
    logger.debug(logPrefix, '-->');

    this.eventList = EventsManager.getList();

    this.state = {
      event: this.eventList.length ? EventsManager.getEventByKey(this.eventList[0].key) : {}
    };

    logger.debug(logPrefix, '<--');
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
      <Form>
        <Select name="evogame-event" label="Event Type" defaultValue={this.state.event.key}>
          {this.eventList.map(event =>
            <Option value={event.key} label={event.label} />
          )}
        </Select>
        <Badges label="Affect" badges={this.state.event.affect} />
        <Input label="TODO" type="number" floatingLabel={true} />
        <Button color="primary" style={{ width: '100%' }} raised={true}>Send Event</Button>
      </Form>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => state)(Events);
