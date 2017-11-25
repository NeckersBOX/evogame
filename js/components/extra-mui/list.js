import { h } from 'preact'

export const List = props => (
  <table className="muiextra--list">
    <tbody>
      {props.children}
    </tbody>
  </table>
);

export const ListItem = props => (
  <tr className="muiextra--list-item">
    <td className="muiextra--list-item-title">{props.label}</td>
    <td className="muiextra--list-item-value">{props.children}</td>
  </tr>
);
