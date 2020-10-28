import React from 'react';
import './Nav.scss';
import { UserContext } from '../../providers/UserProvider';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {

  state = {
    menuActive: false
  }

  private toggleMenu = () => {
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  private dismissMenu = (): void => {
    this.setState({
      menuActive: false
    })
  }

  render(): JSX.Element {
    return (
      <nav className="Nav" onBlur={this.dismissMenu}>
        <i
          className="material-icons"
          onClick={this.toggleMenu}
        >{this.state.menuActive ? 'close' : 'menu'}</i>
        <h1>Markdown Note Taker</h1>
        {
          this.state.menuActive &&
          <div
            onClick={this.dismissMenu}
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              top: 0,
              left: 0,
            }}></div>
        }
        <div className={`menu-shade ${this.state.menuActive ? 'active' : ''}`}>
          <Link onClick={this.dismissMenu} to='/'><i className="material-icons">text_snippet</i> My Documents</Link>
          <Link onClick={this.dismissMenu} to='/login'><i className="material-icons">login</i> Log In</Link>
          <Link onClick={this.dismissMenu} to='/signup'>Sign Up</Link>
        </div>
      </nav>
    )
  }
}
Nav.contextType = UserContext;