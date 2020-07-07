import 'date-fns';
import React, { useState, useEffect } from 'react';
import {Multi} from './Multi.js';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import options from '../json/usStates.json'

export const ControlPanel = ({onChangeStates, initialSelectedStates, onChangeStartDate, onChangeEndDate, startDate, endDate}) => {
  
  const [selectedStates, setSelectedStates] = useState(initialSelectedStates);
  const startStates = [{ label: "Teneessee", value: 'tn' }, { label: "Minnesota", value: 'mn' }];

  const handleStartDateChange = (date) => {
    onChangeStartDate(date);
  };
  
  const handleEndDateChange = (date) => {
    onChangeEndDate(date);
  };

  const getData = () => {
    onChangeStates(selectedStates);
  }

  const updateValues = (newValues) => {
    setSelectedStates(newValues);
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="l"
            margin="normal"
            id="date-picker-inline"
            label="Pick Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="l"
            margin="normal"
            id="date-picker-inline"
            label="Pick End Date"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <div className="div">
        <Multi  options={options} currentSelected={startStates} onStatesUpdate={updateValues}/>
      </div>
      <div className="div">
        <Button variant="contained" className="button" onClick={getData}>Update States</Button>
      </div>
    </div>
  );
}
