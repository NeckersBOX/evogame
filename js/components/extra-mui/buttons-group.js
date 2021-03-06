import { h } from 'preact'

const ButtonsGroup = props => (
  <div className="muiextra--buttons">
    {props.children}
  </div>
);

const ButtonItem = props => (
  <div onClick={props.onClick} className={'muiextra--button-item' + (props.active ? ' selected' : '')}>
    {props.children}
  </div>
);

export { ButtonsGroup, ButtonItem };
