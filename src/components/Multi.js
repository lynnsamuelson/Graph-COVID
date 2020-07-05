import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export const Multi = ({ options, onStatesUpdate, currentSelected }) => { 
    const handleChange = (event, newValues) => {
        onStatesUpdate(newValues);
    }
    return (
        <Autocomplete
        multiple
        id="tags-standard"
        options={options}
        onChange={handleChange}
        getOptionLabel={(option) => option.label}
        defaultValue={currentSelected}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Selected States"
          />
        )}
      />
      );
    }