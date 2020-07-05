import 'date-fns';
import React, { useState, useEffect } from 'react';
import {Multi} from './Multi.js';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

export const ControlPanel = ({onChangeStates, initialSelectedStates, onChangeStartDate, onChangeEndDate, startDate, endDate}) => {
  const [selectedStates, setSelectedStates] = useState(initialSelectedStates);
  // const [startDate, setstartDate] = React.useState(moment());
  // const [endDate, setEndDate] = React.useState(moment().subtract(14, 'days'));

  const handleStartDateChange = (date) => {
    console.log("handle start date", date);
    // setstartDate(date);
    onChangeStartDate(date);
  };
  
  const handleEndDateChange = (date) => {
    // setEndDate(date);
    onChangeEndDate(date);
  };

    const options = [
        { label: "Teneessee", value: 'tn' },
        { label: "Minnesota", value: 'mn' },
        { label: "Florida", value: 'fl' },
        { label: "New York", value: 'ny' }
      ];

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
          <Multi  options={options} currentSelected={options} onStatesUpdate={updateValues}/>
          <Button variant="contained" color="primary" onClick={getData}>Update</Button>
        </div>
    );
}