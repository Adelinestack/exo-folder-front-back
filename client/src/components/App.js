import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Content from './Content';
import { Wrapper } from '../stylized/appStyle';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Wrapper className="App">
          <header className="App-header">
            <h1>Folder - File App</h1>
          </header>
          <main>
            <Switch>
              <Route path="/" render={props => <Content {...props} />} />
            </Switch>
          </main>
        </Wrapper>
      </BrowserRouter>
    );
  }
}

export default App;
