import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdoptionPage from './components/AdoptionPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petData: []
    }
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <div>
            <h1>Petful</h1>
          </div>
        </header>

        <main className = 'Main-container'>
        <Switch>
          <Route exact path = {'/'} component = {LandingPage}/>
          <Route path={'/adoption'} 
            render={(props) => 
              <AdoptionPage {...props} petData={this.state.petData}/>
            }
          />
        </Switch>
        </main>

      </div>
    );
  }

}

export default App;
