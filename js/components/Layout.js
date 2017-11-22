import { h, Component } from 'preact'
import Events from './Events'
import GeneralInfo from './GeneralInfo'
import Logger from './Logger'
import Parameters from './Parameters'

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Events />
        <div id="evogame-container">
          <div id="evogame-left-area">
            <GeneralInfo />
          </div>
          <div id="evogame-right-area">
            <Logger />
            <Parameters />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
