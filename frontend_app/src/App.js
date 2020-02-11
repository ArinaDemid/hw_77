import React, {Component} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Messages from "./containers/Messages/Messages";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div style={{backgroundImage: 'url(https://pixnio.com/free-images/2019/02/20/2019-02-20-19-01-15-1200x900.jpg)'}} >
        <header>
          <Toolbar />
        </header>
        <Container style={{marginTop: '20px'}}>
          <Switch>
            <Route path="/" exact component={Messages} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
