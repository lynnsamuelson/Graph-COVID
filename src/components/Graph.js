import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import Button from '@material-ui/core/Button';
import GraphData from '../js/graphData.js';
import {
  useRecoilState,
} from 'recoil';
import {startDateAtom, endDateAtom, selectedStatesAtom, graphTypeAtom, barGraphDataAtom} from '../js/atoms';
import {BarGraph} from './BarGraph'

let dataToUse = new GraphData();
export const Graph = () => {
  const [covidNumbers, setcovidNumbers] = useState([]);
  const [startDate] = useRecoilState(startDateAtom);
  const [endDate] = useRecoilState(endDateAtom);
  const [states] = useRecoilState(selectedStatesAtom);
  const [graphType, setGraphType] = useRecoilState(graphTypeAtom);
  const [barGraphData, setBarGraphData] = useRecoilState(barGraphDataAtom);
  const [graphParams] = useState({
    yType: 'linear',
    legendLeft: 'Total COVID-19 Cases',
    legendBottom: 'Date'
  })


  useEffect(() => {
    async function fetchData() {
      let data = await dataToUse.getInitialData(states, startDate, endDate, graphType);
      setcovidNumbers(data);
    }
    fetchData();
  },[states, startDate, endDate])

  const getData = () => {
    let data = dataToUse.getSevenDayDataIndividualState(states, startDate, endDate);
    setBarGraphData(data);
    setGraphType('bar');
  }

  if(graphType==='bar') {
    return(
      <div>
        <h1>THIS IS THE SEVEN DAY BAR GRAPH!!!</h1>
        <BarGraph />
      </div>
    )
  }else {
    return (
      <div className="graph">
      <Button onClick={getData}>Get 7 Day Averages</Button>
        <ResponsiveLine
          data={covidNumbers}
          margin={{ top: 50, right: 60, bottom: 70, left: 70 }}
          xScale={{ 
            type: "time",
            format: "%Y-%m-%d",
            useUTC: false
          }}
          yScale={{
            type: graphParams.yType, 
            min: 'auto',
            max: 'auto', 
            stacked: false, 
            reverse: false 
          }}
          axisTop={null}
          axisRight={null}
          xFormat="time:%Y-%m-%d"
          axisBottom={{
            format: "%Y-%m-%d",
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -30,
            legend: graphParams.legendBottom,
            legendOffset: 60,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: graphParams.legendLeft,
            legendOffset: -60,
            legendPosition: 'middle'
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    );
  }
}
