import { h, Component } from 'preact'
import Container from 'preact-mui/lib/container'
import Row from 'preact-mui/lib/row';
import Col from 'preact-mui/lib/col';
import Panel from 'preact-mui/lib/panel'

import { PanelHeader } from './extra-mui/panel'
import { Tabs, Tab } from './extra-mui/tab'

import Events from './Events'
import GeneralInfo from './GeneralInfo'
import WorldMap from './WorldMap'
import Parameters from './Parameters'
import Skills from './Skills'
import Controller from './Controller'

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
              <Controller />
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
                <PanelHeader label="World Map" />
                <WorldMap />
              </Panel>
              <Panel>
                <Tabs>
                  <Tab selected={true} label="Parameters">
                    <Parameters />
                  </Tab>
                  <Tab label="Skills">
                    <Skills />
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
