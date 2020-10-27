import React from 'react';
import './App.css';
import Editor from './components/Editor/Editor';
import Renderer from './components/Renderer/Renderer';

type AppState = {
  markdown: string;
}

export default class App extends React.Component<unknown, AppState> {

  constructor(props: unknown) {
    super(props);
    this.state = {
      markdown: ''
    }
  }

  handleChange = (ev: string): void => {
    this.setState({
      markdown: ev
    })
  }

  render(): JSX.Element {
    return (
    <div className="App" >
      <Editor onChange={this.handleChange} />
      <Renderer markdown={this.state.markdown} />
    </div>
  );
  }
}
