import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { checkValidity, logout } from "../app/store";
import { AdminTabs, Settings, SuperAdminTabs, UserTabs } from "./NavbarData";

// const settings = ['Profile','Settings','Logout']

function NavBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  // const open = Boolean(anchorElNav);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState(Settings);
  const [tabs, setTabs] = useState([]);
  // Use this in all components
  const role = useSelector((state) => state.loginReducer.role);

  useEffect(() => {
    dispatch(checkValidity());
    if (role == null) {
      navigate("/login");
    }
    if (role === "super-admin") {
      setTabs(SuperAdminTabs);
    } else if (role === "admin") {
      setTabs(AdminTabs);
    } else setTabs(UserTabs);
  }, [role, dispatch, navigate]);
  // till here

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    // setAnchorElNav("notnull");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  console.log("ROLE:", role);
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#CCCCCC" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* LOGO HERE */}
            <Typography
              variant="h6"
              // noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "black",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                // open={open}
                open={Boolean(anchorElNav)}
                anchorEl={anchorElNav}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {tabs.map((page) => (
                  <MenuItem
                    key={page.text}
                    onClick={(e) => {
                      navigate(page.path);
                    }}
                  >
                    {page.icon}
                    <ListItemText>{page.text}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {tabs.map((page) => (
                <Button
                  key={page.text}
                  href={page.path}
                  sx={{ my: 2, color: "#2C2C2C", display: "inline-flex" }}
                >
                  {page.text}
                </Button>
              ))}
            </Box>
            {/* SETTINGS MENU */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <AccountCircleIcon
                  fontSize="large"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                />
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.text}
                    onClick={(e) => {
                      if (setting.text === "Log Out") {
                        dispatch(logout());
                      }
                      navigate(setting.path);
                    }}
                  >
                    {setting.icon}
                    <ListItemText>{setting.text}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
