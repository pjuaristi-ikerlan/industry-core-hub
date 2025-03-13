/********************************************************************************
 * Eclipse Tractus-X - Industry Core Hub Frontend
 *
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the
 * License for the specific language govern in permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
********************************************************************************/

import { useState } from 'react';
import { Toolbar, IconButton, Typography, Grid2, Menu, MenuItem, Divider, ListItemIcon, Box } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

interface HeaderProps {
  handleDrawerOpen: () => void;
  open: boolean;
  drawerWidth: number;
}

const Header = ({ handleDrawerOpen, open, drawerWidth }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: 'none' },
          ]}
        >
          <MenuIcon style={{color: 'white'}}/>
        </IconButton>
        <Grid2 container spacing={2} alignItems="center" sx={{ width: '100%' }}>
          <Grid2 size={4} justifyItems="start" className='main-logo-wrapper'>
            <a href="/" className="main-logo-link">
              <img
                src="/241117_Tractus_X_Logo_RGB_Light_Version.png"
                alt="Eclipse Tractus-X logo"
                className='main-logo'
              />
            </a>
          </Grid2>

          <Grid2 size={4} justifyItems="center">
            <h2>Industry Core Hub</h2>
          </Grid2>

          <Grid2 size={4} justifyItems="right">
            <Box>
              <IconButton aria-label="user-menu" className='user-menu-btn' onClick={handleMenuOpen}>
                <PersonIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                className='navbar-user-dropdown'
              >
                {/* Encabezado con nombre y email */}
                <Typography variant="subtitle1" sx={{ padding: '8px 16px 0px 16px', fontWeight: 'bold' }}>
                  Mathias Brunkow Moser
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ padding: '0 16px 8px', fontStyle: 'italic' }}>
                  CX-Operator
                </Typography>
                <Divider />

                {/* Opciones del menú */}
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default Header;