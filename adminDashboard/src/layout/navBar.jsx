import {
  AppBar,
  Box,
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
import auth from "../state";
const navBar = () => {
  const theme = useTheme();
  const logged = useSelector((state) => state.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const NavForNoneLogged = (props) => {
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
        <Button onClick={() => dispatch(auth.actions.logout())}>
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
          {logged ? <NavForLogged color="" /> : <NavForNoneLogged color="" />}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default navBar;
