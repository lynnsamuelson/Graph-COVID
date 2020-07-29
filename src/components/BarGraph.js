import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import {
  useRecoilState,
} from 'recoil';
import {barGraphDataAtom} from '../js/atoms';


const graphInfo = { bottomLegend: "Date" };
const graphKeys = [ 'tn', 'mn' ];

export const BarGraph = () => {
  const [barGraphData] = useRecoilState(barGraphDataAtom);

    return (
      <div className="graph">
        <ResponsiveBar
            data={barGraphData}
            keys={graphKeys}
            indexBy="date"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'nivo' }}
            
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    </div>
  )
};

