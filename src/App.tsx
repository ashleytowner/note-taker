import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CombinedEditor from './components/CombinedEditor/CombinedEditor';

type AppState = {
  markdown: string;
  editorHTML: string;
}

export default class App extends React.Component<unknown, AppState> {

  constructor(props: unknown) {
    super(props);
    this.state = {
      markdown: '',
      editorHTML: ''
    }
  }

  handleChange = (ev: { markdown: string}): void => {
    this.setState({
      markdown: ev.markdown,
    })
  }

  render(): JSX.Element {
    return (
    <div className="App" >
      <Router>
        <Switch>
          <Route exact path="/">
            <CombinedEditor
              onChange={this.handleChange}
              markdown={this.state.markdown}
            ></CombinedEditor>
          </Route>
        </Switch>
      </Router>
    </div>
  );
  }
}
