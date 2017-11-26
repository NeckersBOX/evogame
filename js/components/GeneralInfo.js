import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { List, ListItem } from './extra-mui/list'

class GeneralInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        <ListItem label="Generation">{this.props.generation}</ListItem>
        <ListItem label="Solutions">{this.props.solutions.length}</ListItem>
        <ListItem label="Day">{this.props.day}</ListItem>
      </List>
    );
  }
}

export default connect(state => state)(GeneralInfo);
