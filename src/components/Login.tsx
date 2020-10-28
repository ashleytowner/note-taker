import React from 'react';
import Firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom';

type LoginState = {
  email: string;
  password: string;
  loginCompleted: boolean;
}

export default class Login extends React.Component<unknown, LoginState> {

  constructor(props: unknown) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginCompleted: false
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const field = event.target.name;
    this.setState({
      ...this.state,
      [field]: event.target.value
    });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          loginCompleted: true
        })
      })
  }

  render(): JSX.Element {
    return (
      <div>
        {this.state.loginCompleted && <Redirect to="/"></Redirect>}
        <h1 style={{textAlign: 'center'}}>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
          Email:
            <input value={this.state.email} onChange={this.handleChange} type="text" name="email"></input>
          </label>
          <label htmlFor="password">
          Password:
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password"></input>
          </label>
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}