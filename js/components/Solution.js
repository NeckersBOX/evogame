import { h } from 'preact'
import { List, ListItem } from './extra-mui/list'

const Solution = props => (
  <div className="evogame--solution">
    <div style={{ background: props.solution.color }} />
    <div>
      <List>
        {props.solution.skills.map(skill =>
          <ListItem label={props.labelCb(skill.key)}>
            {skill.value}
          </ListItem>
        )}
      </List>
    </div>
  </div>
);

export default Solution;
