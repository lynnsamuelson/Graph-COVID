import React, { useState, useEffect } from 'react';
import './App.css';
import {Graph} from './components/Graph.js';
import {ControlPanel} from './components/ControlPanal.js';
import moment from 'moment';

function App() {
  const [states, setStates] = useState(['mn', 'tn'])
  const [startDate, setStartDate] = useState(moment().subtract(14, 'days'));
  const [endDate, setEndDate] = useState(moment());
 
  const updateStates = (states) => {
    let newValues = states.map(state => {
      return state.value;
    })
    setStates(newValues);
  }

  const updateStartDate = (date) => {
    setStartDate(date);
  };
  
  const updateEndDate = (date) => {
    setEndDate(date);
  }
  
  return (
    <div>
    <div>
        <h3 className="center">The data displayed is from the <a href="https://covidtracking.com" target="_blank">COVID Tracking Project.</a></h3>
      </div>
      <div className="App flex-grid">
      <div className="col-9">
        <Graph
          states={states}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="col-3 control">
        <ControlPanel 
          onChangeStates={updateStates}
          initialSelectedStates={states}
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={updateStartDate}
          onChangeEndDate={updateEndDate}
        />
      </div>
    </div>
    </div>
  );
}

export default App;
