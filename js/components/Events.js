import { h, Component } from 'preact'
import Form from 'preact-mui/lib/form'
import Select from 'preact-mui/lib/select'
import Option from 'preact-mui/lib/option'
import Input from 'preact-mui/lib/input'
import Button from 'preact-mui/lib/button'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Events');

class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
      <Form>
        <Select name="evogame-event" label="Event Type" defaultValue="todo">
          <Option value="todo" label="To think about it" />
        </Select>
        <Input label="Last for .. days" type="number" floatingLabel={true} />
        <Button color="primary" style={{ width: '100%' }} raised={true}>Send Event</Button>
      </Form>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default Events;
