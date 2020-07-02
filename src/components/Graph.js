import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import GraphData from '../js/graphData.js';
import moment from 'moment';

export const Graph = () => {
  const [covidNumbers, setcovidNumbers] = useState([]);

  useEffect(() => {
    let params = {
      states: ['mn', 'tn', 'fl', 'ny', 'mt'],
      startDate: moment().subtract(14, 'days'),
      endDate: moment()
    }
    let dataToUse = new GraphData(params);
    async function fetchData() {
      let data = await dataToUse.getInitialData();
      setcovidNumbers(data);
    }
    fetchData();
  },[])

  return (
    <div className="graph">
      <ResponsiveLine
        data={covidNumbers}
        margin={{ top: 50, right: 110, bottom: 70, left: 70 }}
        xScale={{ 
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false
         }}
        yScale={{
          type: 'linear', 
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
          legend: 'Date',
          legendOffset: 60,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Total COVID-19 Cases',
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
