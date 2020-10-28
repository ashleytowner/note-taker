import React from 'react';
import Firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom';

type SignupState = {
  email: string;
  password: string;
  signupCompleted: boolean;
}

export default class Signup extends React.Component<unknown, SignupState> {
  state = {
    email: '',
    password: '',
    signupCompleted: false
  };

  private signup = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          signupCompleted: true
        })
      })
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const field = event.target.name;
    this.setState({
      ...this.state,
      [field]: event.target.value
    });
  }

  render(): JSX.Element {
    return (
      <div>
        {this.state.signupCompleted && <Redirect to="/"></Redirect>}
        <h1 style={{textAlign: 'center'}}>Sign Up</h1>
        <form onSubmit={this.signup}>
          <label htmlFor="email">
          Email:
            <input type="email" name="email" onChange={this.handleChange}/>
          </label>
          <label htmlFor="password">
          Password:
            <input type="password" onChange={this.handleChange} name="password"/>
          </label>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}