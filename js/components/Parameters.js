import { h, Component } from 'preact'
import Input from 'preact-mui/lib/input'
import Row from 'preact-mui/lib/row';
import Col from 'preact-mui/lib/col';

class Parameters extends Component {
  constructor(props) {
    super(props);

    /* TODO: move in store with get and set functions */
    this.state = {
      parameters: [
        {
          label: 'Solutions',
          min: '1',
          defaultValue: '16',
          value: 16
        },
        {
          label: 'Days per generation',
          min: '1',
          defaultValue: '365',
          value: 365
        },
        {
          label: 'Mutability',
          min: '0',
          max: '100',
          defaultValue: '2',
          value: 2
        },
        {
          label: 'Reproductivity',
          min: '0',
          max: '100',
          defaultValue: '0',
          value: 0
        }
      ]
    };
  }

  changeParameter (event, ref) {
    let parameters = this.state.parameters.map(p => {
      if ( p.label != ref ) {
        return p;
      }

      p.value = event.target.value;
      return p;
    });

    this.setState({ parameters });
  }

  render() {
    return (
      <div>
        <Row>
          {this.state.parameters.map(property =>
            <Col md="3" sm="6">
              <Input {...property} type="number" floatingLabel={true}
                onChange={e => this.changeParameter(e, property.label)} />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Parameters;
