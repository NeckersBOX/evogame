import { h, Component } from 'preact'
import { connect } from 'preact-redux'

class WorldMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const [width, height] = [
      this.props.parameters.find(p => p.key == 'world-width').value || 1,
      this.props.parameters.find(p => p.key == 'world-height').value || 1
    ];

    return (
      <div className="evogame--worldmap">
        {new Array(height).fill(
          <div className="evogame--worldmap-row">
            {new Array(width).fill(
              <div className="evogame--worldmap-col" style={{
                width: (100 / width) + '%',
                paddingBottom: (100 / width) + '%'
              }} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => state)(WorldMap);
