import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CombinedEditor from './components/CombinedEditor/CombinedEditor';
import Firebase from 'firebase/app';
import Login from './components/Login';
import MyDocuments from './components/MyDocuments/MyDocuments';
import UserProvider from './providers/UserProvider';
import Nav from './components/Nav/Nav';
import Signup from './components/Signup';

type AppState = {
  markdown: string;
  editorHTML: string;
}

export default class App extends React.Component<unknown, AppState> {

  firebase: Firebase.app.App | undefined = undefined;

  constructor(props: unknown) {
    super(props);
    this.state = {
      markdown: '',
      editorHTML: ''
    }
    if (Firebase.apps.length === 0) {
      this.firebase = Firebase.initializeApp({
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        databaseURL: process.env.REACT_APP_DATABASEURL,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_APPID,
        measurementId: process.env.REACT_APP_MEASUREMENTID
      });
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
        <UserProvider>
          <Router>
            <Nav></Nav>
            <main>
              <Switch>
                <Route exact path="/edit/:id">
                  <CombinedEditor
                    onChange={this.handleChange}
                    markdown={this.state.markdown}
                  ></CombinedEditor>
                </Route>
                <Route path="/login">
                  <Login></Login>
                </Route>
                <Route path="/signup">
                  <Signup></Signup>
                </Route>
                <Route exact path="/">
                  <MyDocuments></MyDocuments>
                </Route>
              </Switch>
            </main>
          </Router>
        </UserProvider>
      </div>
    );
  }
}
