import React, { useState, useEffect } from 'react';
import './App.css';
import {Graph} from './components/Graph.js';
import {ControlPanel} from './components/ControlPanal.js';


function App() {
  
  return (
    <div>
      <div>
        <h3 className="center">The data displayed is from the <a href="https://covidtracking.com" target="_blank">COVID Tracking Project.</a></h3>
      </div>
      <div className="App flex-grid">
        <div className="col-9">
          <Graph />
        </div>
        <div className="col-3 control">
          <ControlPanel />
        </div>
      </div>
    </div>

  );
}

export default App;
