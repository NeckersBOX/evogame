import { h, Component } from 'preact'

class Tabs extends Component {
  constructor(props) {
    super(props);

    let selected = 0;
    for ( let id in props.children ) {
      if ( props.children[id].attributes.selected ) {
        selected = id;
        break;
      }
    }

    this.state = {
      selected
    };
  }

  render() {
    return (
      <div className="muiextra--tabs">
        <ul>
          {this.props.children.map((children, idx) =>
            <li key={idx} className={this.state.selected == idx ? 'selected' : ''}>
              <a href="#" onClick={() => this.setState({ selected: idx })}>{children.attributes.label}</a>
            </li>
          )}
        </ul>
        <div>
          {this.props.children[this.state.selected]}
        </div>
      </div>
    );
  }
}

const Tab = props => <div>{props.children}</div>;

export { Tabs, Tab };
