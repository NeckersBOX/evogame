import { h } from 'preact'
import EvoComponent from './EvoComponent'

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

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('Layout');

class Layout extends EvoComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
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
            <Col md="6">
              <Panel>
                <PanelHeader label="World Map" />
                <WorldMap />
              </Panel>
            </Col>
            <Col md="3">
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

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default Layout;
