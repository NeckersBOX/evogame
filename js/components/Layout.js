import { h, Component } from 'preact'
import Container from 'preact-mui/lib/container'
import Row from 'preact-mui/lib/row';
import Col from 'preact-mui/lib/col';
import Tabs from 'preact-mui/lib/tabs'
import Panel from 'preact-mui/lib/panel'
import Tab from 'preact-mui/lib/tab'

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
              <Events />
              <GeneralInfo />
            </Col>
            <Col md="9">
              <Panel>
                <Tabs justified={true}>
                  <Tab selected={true} value="pane-parameters" label="Parameters">
                    <Parameters />
                  </Tab>
                  <Tab value="pane-logger" label="Logger">
                    <Logger />
                  </Tab>
                </Tabs>
              </Panel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Layout;
