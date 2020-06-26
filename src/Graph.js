import React, { useState, useEffect } from 'react';
import svc from './covidService';
import * as d3 from d3;

export const Graph = () => {
    const [count, setCount] = useState(0);
    const [covidNumbers, setcovidNumbers] = useState([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {
      svc.getCountrySummaryData().then((result) => {
        console.log("got data", result);
        setcovidNumbers(result);
      })
    },[reload])
   
    return (
      <div>
        <div id="graph"></div>
        <ul>
        {covidNumbers.map((value, index) => {
        return (
          <li key={index}>
            <p>{value.date}</p>
            <p>{value.positive}</p>
          
          </li>
        )
      })}
        </ul>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
