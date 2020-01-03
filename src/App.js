import React from 'react';
import './App.css';
import SelectorCards from './SelectorCards/SelectorCards';
import Resourceposition from './ProgramRecources/RecourcePlacement';
import Login from './Login/Login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (

    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <img className="headerpic" src="/PhotoSc.png"/>
      </header>
        <Router>
          <Route exact path="/" component={SelectorCards} />
          <Route path="/recource" component={Resourceposition}/>
          <Route path="/simple_user" component={Login}/>
        </Router>
    </div>
  );
}

export default App;
