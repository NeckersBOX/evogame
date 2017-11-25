import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import Panel from 'preact-mui/lib/panel'
import { List, ListItem } from './extra-mui/list'
import { PanelHeader } from './extra-mui/panel'

class GeneralInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel>
        <PanelHeader label="General Info" />
        <List>
          <ListItem label="Generation">{this.props.generation}</ListItem>
          <ListItem label="Solutions">{this.props.solutions}</ListItem>
          <ListItem label="Day">{this.props.day}</ListItem>
        </List>
      </Panel>
    );
  }
}

export default connect(state => state)(GeneralInfo);
