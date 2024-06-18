import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { toogleModel } from '../redux/reducers/storeReducer';
import { logOut } from '../redux/reducers/authReducer';

export default function BasicMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(toogleModel());
  };

  const importData = () => {
    setAnchorEl(null);
    dispatch(toogleModel());
  };

  const username = localStorage.getItem('username') || 'Guest';

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: 'white', display: 'flex', alignItems: 'center' }}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            bgcolor: blue[800]
          }}
          src="/broken-image.jpg"
          alt="User Avatar"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = ''; // Fallback image if the src is broken
          }}
        />
        <div className="px-2 text-xs">{username}</div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={importData}>Import Data</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => dispatch(logOut())}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
