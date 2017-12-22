import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('WorldMap');

class WorldMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    const [width, height] = [
      this.props.managers.parameters.getValueByKey('world-width') || 1,
      this.props.managers.parameters.getValueByKey('world-height') || 1
    ];
    logger.debug(logPrefix, 'width:', width, 'height:', height);

    let stage = (
      <div className="evogame--worldmap">
        {new Array(height).fill().map((e, y) => (
          <div className="evogame--worldmap-row">
            {new Array(width).fill().map((e, x) => {
              let solution = this.props.managers.solutions.getSolutionAt({ x, y });

              return (
                <div className="evogame--worldmap-col" style={{
                    width: (100 / width) + '%',
                    paddingBottom: (100 / width) + '%'
                  }}>
                  { solution !== null ? (
                    <div className="evogame--worldmap-solution" style={{
                      background: solution.color
                    }} />
                  ) : '' }
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => state)(WorldMap);
