import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Content from './Content';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Folder - File App</h1>
          </header>
          <main>
            <Switch>
              <Route path="/" render={props => <Content {...props} />} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
