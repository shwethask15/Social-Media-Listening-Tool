import React, { useState } from 'react';
import { Button, Menu, MenuItem, MenuList } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
 
const FilterMenu = ({ options, selectedOption, onOptionChange, months, selectedMonth, onMonthChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [submenuType, setSubmenuType] = useState(null);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    closeSubmenu();
  };
 
  const handleClose = () => {
    closeMenus();
  };
 
  const handleSubmenuOpen = (event, type) => {
    if (submenuType !== type) {
      closeSubmenu();
    }
    setSubmenuType(type);
    setSubmenuAnchorEl(event.currentTarget);
  };
 
  const closeSubmenu = () => {
    setSubmenuAnchorEl(null);
    setSubmenuType(null);
  };
 
  const closeMenus = () => {
    setAnchorEl(null);
    closeSubmenu();
  };
 
  return (
    <div>
      <Button onClick={handleClick} variant="contained" style={{ backgroundColor: 'transparent', color: '#220047', boxShadow: 'none', fontSize: '16px', textTransform: 'none' }}>
        <i className="fa fa-filter" aria-hidden="true"></i> Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="filter-dropdown"
      >
        <MenuList>
          {months && (
            <MenuItem
              onClick={(event) => handleSubmenuOpen(event, 'month')}
              aria-haspopup="true"
            >
              Select Month <ArrowRightIcon />
            </MenuItem>
          )}
          {options && (
            <MenuItem
              onClick={(event) => handleSubmenuOpen(event, 'trend')}
              aria-haspopup="true"
            >
              Select Trend <ArrowRightIcon />
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <Menu
        anchorEl={submenuAnchorEl}
        keepMounted
        open={Boolean(submenuAnchorEl)}
        onClose={closeSubmenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        className="filter-dropdown"
      >
        {submenuType === 'month' && months.map((month) => (
          <MenuItem
            key={month}
            selected={selectedMonth === month}
            onClick={() => onMonthChange(month)}
          >
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </MenuItem>
        ))}
        {submenuType === 'trend' && options.map((option) => (
          <MenuItem
            key={option}
            selected={selectedOption === option}
            onClick={() => onOptionChange(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
 
export default FilterMenu;