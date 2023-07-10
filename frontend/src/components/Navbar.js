import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
    setMenuOpen(false); // Close the menu if it's open
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handlePasswordDialogOpen = () => {
    setPasswordDialogOpen(true);
    setMenuOpen(false); // Close the menu if it's open
  };

  const handlePasswordDialogClose = () => {
    setPasswordDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleLogoutDialogClose();
  };

  const handleChangePassword = () => {
    // Handle the logic for changing the password
    handlePasswordDialogClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tracking System
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogoutDialogOpen}>
            <AccountCircleIcon sx={{ marginRight: 1 }} />
            Logout
          </MenuItem>
          <MenuItem onClick={handlePasswordDialogOpen}>
            <LockIcon sx={{ marginRight: 1 }} />
            Change Password
          </MenuItem>
        </Menu>
      </Toolbar>
      <Dialog open={isLogoutDialogOpen} onClose={handleLogoutDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose}>Cancel</Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isPasswordDialogOpen} onClose={handlePasswordDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to change your password?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose}>Cancel</Button>
          <Button onClick={handleChangePassword} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
