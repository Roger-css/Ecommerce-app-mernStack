import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth, { authenticated, logout } from "../state/reducers/auth";
import axios from "../api/axios";
const navBar = () => {
  const theme = useTheme();
  const logged = useSelector(authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const req = await axios.post("/sign-out");
      console.log(req);
      dispatch(logout());
    } catch (error) {
      console.log(error);
      dispatch(logout({ error: error.message }));
    }
  };
  const NavForNoneLogged = () => {
    return (
      <Stack direction="row" spacing={2}>
        <Button onClick={() => navigate("/sign-in")}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.common.white }}
          >
            Sign in
          </Typography>
        </Button>
        <Button onClick={() => navigate("/sign-up")}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.common.white }}
          >
            Sign up
          </Typography>
        </Button>
      </Stack>
    );
  };
  const NavForLogged = (props) => {
    return (
      <Stack direction="row">
        <Button
          onClick={() => {
            dispatch(auth.actions.logout());
            handleLogOut();
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: theme.palette.common.white }}
          >
            Sign out
          </Typography>
        </Button>
      </Stack>
    );
  };
  return (
    <AppBar
      sx={{
        position: "relative",
        color: theme.palette.common.white,
        backgroundColor: "#212121",
      }}
    >
      <Toolbar>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ flexGrow: "1" }}>
            Admin dashboard
          </Typography>
          {logged ? <NavForLogged /> : <NavForNoneLogged />}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default navBar;
