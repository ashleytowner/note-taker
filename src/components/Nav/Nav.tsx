import React from "react";
import './Nav.scss';
import Firebase from 'firebase';
import { UserContext } from '../../providers/UserProvider';

export default class Nav extends React.Component {
  render(): JSX.Element {
    console.log(this.context, Firebase.auth().currentUser)
    return (
      <nav className="Nav">
        <h1>Markdown Note Taker</h1>
        <p>{this.context.user?.email}</p>
      </nav>
    )
  }
}
Nav.contextType = UserContext;