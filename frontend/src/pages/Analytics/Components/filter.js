import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const MultipleFilter = () => {
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');

  const handleFilter1Change = (event) => {
    setFilter1(event.target.value);
  };

  const handleFilter2Change = (event) => {
    setFilter2(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '200px' }}>
      <FormControl fullWidth>
        <InputLabel id="filter1-label">Filter 1</InputLabel>
        <Select
          labelId="filter1-label"
          id="filter1"
          value={filter1}
          label="Filter 1"
          onChange={handleFilter1Change}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'option1'}>Option 1</MenuItem>
          <MenuItem value={'option2'}>Option 2</MenuItem>
          <MenuItem value={'option3'}>Option 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="filter2-label">Filter 2</InputLabel>
        <Select
          labelId="filter2-label"
          id="filter2"
          value={filter2}
          label="Filter 2"
          onChange={handleFilter2Change}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'optionA'}>Option A</MenuItem>
          <MenuItem value={'optionB'}>Option B</MenuItem>
          <MenuItem value={'optionC'}>Option C</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultipleFilter;
