import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import BasicMenu from './BasicMenu';
import ImportData from './ImportData';

const Nav:React.FC = () => {
  return (
    <div>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#3060a8" }}>
        <Toolbar className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <img src="public/assets/logo-removebg.png" alt="Company Logo" />
          </div>
          <BasicMenu />
        </Toolbar>
      </AppBar>
      <ImportData />
    </div>
  );
}

export default Nav
