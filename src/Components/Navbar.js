import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const drawerWidth = 240;

function Navbar() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [Cookie, setCookie] = useCookies(["access_token"]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handle_login = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userID", "");
    setSnackbarMessage("Logging Out...");
    setSnackbarSeverity("warning");
    setSnackbarOpen(true)
    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Short Url
      </Typography>
      <Divider />
      <List>
        {!Cookie.access_token ? (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate("/")}
            >
              <ListItemText>Login</ListItemText>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={handle_login}>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate("/createurl")}
          >
            <ListItemText>Create ShortUrl</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate("/dashboard")}
          >
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Short Url
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>

              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate("/createurl")}
              >
                Create Short Url
              </Button>

              {Cookie.access_token ? (
                <Button sx={{ color: "#fff" }} onClick={handle_login}>
                  Log out
                </Button>
              ) : (
                <Button sx={{ color: "#fff" }} onClick={() => navigate("/")}>
                  Login/Register
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </>
  );
}

export default Navbar;
