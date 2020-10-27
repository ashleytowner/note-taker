import React from "react";
import Firebase from 'firebase';

type LoginState = {
  email: string;
  password: string;
}

export default class Login extends React.Component<unknown, LoginState> {

  constructor(props: unknown) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(u => {
      console.log(u);
    })
  }

  render(): JSX.Element {
    return (
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
    )
  }
}