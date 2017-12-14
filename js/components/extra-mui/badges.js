import { h } from 'preact'

const Badges = props => {
  let badgeLabel = null;

  if ( props.hasOwnProperty('label') ) {
    badgeLabel = <span>{props.label}</span>;
  }

  return (
    <div className="muiextra--badges">
      {badgeLabel}
      <ul>
        {props.badges.map(badge =>
          <li style={{ backgroundColor: badge.color }}>{badge.label}</li>
        )}
      </ul>
    </div>
  );
};

export { Badges };
