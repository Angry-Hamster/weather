import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/navbar/Navigation';

import Home from './pages/home/Home';
import Chart from './pages/chart/Chart';
import Card from './pages/card/Card';

class App extends React.Component {
  statr = {}
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/map">
            <Card />
          </Route>
          <Route exact path="/chart">
            <Chart />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;

