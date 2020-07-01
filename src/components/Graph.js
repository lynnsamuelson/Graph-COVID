import React, { useState, useEffect } from 'react';
import svc from '../svc/covidService';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment';

export const Graph = () => {
  const [covidNumbers, setcovidNumbers] = useState([]);
  const [reload] = useState(false);

  useEffect(() => {
    let stateData = getStateData('tn', moment().subtract(14, 'days'), moment())
    svc.getStateSummaryData('tn', moment().subtract(14, 'days'), moment()).then((result) => {
      console.log("result", result)
      let totalData = [];
      result.forEach(day => {
        if(moment(day.dateChecked) > moment().subtract(14, 'days')){
          totalData.push({ 
            x: moment(day.dateChecked).format('l'), 
            y: day.positiveCasesViral
          })
        }
      })
      totalData.sort((a,b) => {
        return moment(a.x) - moment(b.x)
      })
    // console.log("stateData", stateData);
    // let totalData = [];
    // totalData.push(stateData);
      let total = {
        id:"total",
        color: "hsl(294, 70%, 50%)",
        // data: stateData
        data: totalData
      }
      console.log("total", total);
      setcovidNumbers([total]);
    })
  },[reload])

  const getStateData = (state, dateStart, dateEnd) => {
    let totalData = [];
    svc.getStateSummaryData('tn', moment().subtract(14, 'days'), moment()).then((result) => {
      console.log("result", result)
      result.forEach(day => {
          totalData.push({ 
            x: moment(day.dateChecked).format('l'), 
            y: day.positiveCasesViral
          })
      })
      totalData.sort((a,b) => {
        return moment(a.x) - moment(b.x)
      })
    })
    return totalData;
}

  return (
    <div className="graph">
      <ResponsiveLine
        data={covidNumbers}
        margin={{ top: 50, right: 110, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear', 
          min: 'auto',
          max: 'auto', 
          stacked: false, 
          reverse: false 
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Date',
          legendOffset: 36,
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
