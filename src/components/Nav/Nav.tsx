import React from 'react';
import './Nav.scss';
import { UserContext } from '../../providers/UserProvider';

export default class Nav extends React.Component {
  render(): JSX.Element {
    return (
      <nav className="Nav">
        <h1>Markdown Note Taker</h1>
      </nav>
    )
  }
}
Nav.contextType = UserContext;