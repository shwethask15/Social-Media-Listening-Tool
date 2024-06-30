import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup({ setCurrentPage }) {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={() => setCurrentPage('map')}>World Map</Button>
      <Button onClick={() => setCurrentPage('topicFilter')}>Topic Filter</Button>
    </ButtonGroup>
  );
}
