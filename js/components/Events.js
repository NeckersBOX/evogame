import { h, Component } from 'preact'
import Form from 'preact-mui/lib/form'
import Select from 'preact-mui/lib/select'
import Option from 'preact-mui/lib/option'
import Input from 'preact-mui/lib/input'
import Button from 'preact-mui/lib/button'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'
import evoEvents from '../events'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Events');

class Events extends Component {
  constructor(props) {
    super(props);
    const logPrefix = ':constructor] ';
    logger.debug(logPrefix, '-->');

    this.evoEvents = new evoEvents();
    this.eventList = this.evoEvents.getList();

    this.state = {
      event: this.eventList.length ? this.evoEvents.getEventByKey(this.eventList[0].key) : {}
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
            <Option key={event.key} value={event.key} label={event.label} />
          )}
        </Select>
        <Input label="TODO" type="number" floatingLabel={true} />
        <Button color="primary" style={{ width: '100%' }} raised={true}>Send Event</Button>
      </Form>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default Events;
