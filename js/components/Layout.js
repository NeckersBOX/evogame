import { h, Component } from 'preact'
import Container from 'preact-mui/lib/container'
import Row from 'preact-mui/lib/row';
import Col from 'preact-mui/lib/col';
import Panel from 'preact-mui/lib/panel'

import { PanelHeader } from './extra-mui/panel'
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
        <Container fluid={true}>
          <Row>
            <Col md="3">
              <Panel>
                <PanelHeader label="Event" />
                <Events />
              </Panel>
              <Panel>
                <PanelHeader label="General Info" />
                <GeneralInfo />
              </Panel>
            </Col>
            <Col md="9">
              <Panel>
                <PanelHeader label="Logger" />
                <Logger />
              </Panel>
              <Panel>
                <PanelHeader label="Parameters" />
                <Parameters />
              </Panel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Layout;
