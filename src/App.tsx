import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CombinedEditor from './components/CombinedEditor/CombinedEditor';
import Firebase from 'firebase/app';
import Login from './components/Login/Login';
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
        apiKey: 'AIzaSyACJYpziGrjNvx2c_QtvdTQZ-M51_BRLw4',
        authDomain: 'markdown-notes-a25b5.firebaseapp.com',
        databaseURL: 'https://markdown-notes-a25b5.firebaseio.com',
        projectId: 'markdown-notes-a25b5',
        storageBucket: 'markdown-notes-a25b5.appspot.com',
        messagingSenderId: '22979893937',
        appId: '1:22979893937:web:35ae432d4406501a096090',
        measurementId: 'G-GN60ZNP91C'
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
