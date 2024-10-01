import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../assets/logo.png';

function Header({ onSettingsClick }) {
  return (
    <AppBar position="static" style={{ borderBottom: '2px solid #1976d2' }}>
      <Toolbar>
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: 'auto' }} />
        <IconButton color="inherit" onClick={onSettingsClick}>
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;