import React from 'react';
import Firebase from 'firebase/app';
import 'firebase/auth';

type SignupState = {
  email: string;
  password: string;
}

export default class Signup extends React.Component<unknown, SignupState> {
  state = {
    email: '',
    password: ''
  };

  private signup = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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
      <form onSubmit={this.signup}>
        <input type="email" name="email" onChange={this.handleChange}/>
        <input type="password" onChange={this.handleChange} name="password"/>
        <input type="submit" value="Sign Up" />
      </form>
    )
  }
}