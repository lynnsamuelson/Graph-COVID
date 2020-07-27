import 'date-fns';
import React, { useState, useEffect } from 'react';
import {Multi} from './Multi.js';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import options from '../json/usStates.json';
import {
  useRecoilState,
} from 'recoil';
import {startDateAtom, endDateAtom, selectedStatesAtom} from '../js/atoms'

export const ControlPanel = ({onChangeStates, initialSelectedStates}) => {
  const [startDate, setStartDate] = useRecoilState(startDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const [selectedStates, setSelectedStates] = useRecoilState(selectedStatesAtom);
  const startStates = [{ label: "Teneessee", value: 'tn' }, { label: "Minnesota", value: 'mn' }];

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const getData = () => {
    onChangeStates(selectedStates);
  }

  const updateValues = (newValues) => {
    let valuesArray = newValues.map(val => {
      return val.value
    })
    setSelectedStates(valuesArray);
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
  
    </div>
  );
}
