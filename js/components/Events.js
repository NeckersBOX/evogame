import { h, Component } from 'preact'
import Form from 'preact-mui/lib/form'
import Select from 'preact-mui/lib/select'
import Option from 'preact-mui/lib/option'
import Input from 'preact-mui/lib/input'
import Button from 'preact-mui/lib/button'
import Panel from 'preact-mui/lib/panel'
import { PanelHeader } from './extra-mui/panel'

class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel>
        <PanelHeader label="Event" />
        <Form>
          <Select name="evogame-event" label="Event Type" defaultValue="todo">
            <Option value="todo" label="To think about it" />
          </Select>
          <Input label="Last for .. days" type="number" floatingLabel={true} />
          <Button color="primary" style={{ width: '100%' }} raised={true}>Send Event</Button>
        </Form>
      </Panel>
    );
  }
}

export default Events;
