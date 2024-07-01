import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

const CustomButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  // borderRadius: '25px',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  alignItems: 'center',
  border: '1px solid black',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  border: 'none',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
  '&.Mui-selected': {
    backgroundColor: '#e3cffd',
    boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)',
  },
  '&:not(:last-child)': {
    borderRight: '1px solid #ccc',
  },
}));

export default function BasicButtonGroup({ setCurrentPage }) {
  const [selected, setSelected] = React.useState('map');

  const handleClick = (page) => {
    setSelected(page);
    setCurrentPage(page);
  };

  return (
    <CustomButtonGroup>
      <CustomButton
        className={selected === 'map' ? 'Mui-selected' : ''}
        onClick={() => handleClick('map')}
      >
        World Map
      </CustomButton>
      <CustomButton
        className={selected === 'topicFilter' ? 'Mui-selected' : ''}
        onClick={() => handleClick('topicFilter')}
      >
        Topic Filter
      </CustomButton>
    </CustomButtonGroup>
  );
}
 