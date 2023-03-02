import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
const SideBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const navList = [
    { text: "categories", link: "/" },
    { text: "products", link: "products" },
    { text: `orders`, link: `orders` },
    { text: "pages", link: "page" },
  ];
  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          height: "100vh",
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <List>
          {navList.map((obj, index) => (
            <ListItem
              alignItems="center"
              sx={{ justifyContent: "flex-start" }}
              key={index}
              disablePadding
            >
              <ListItemButton onClick={() => navigate(obj.link)}>
                <NavLink
                  className="sideBarLinks"
                  style={{
                    width: "100%",
                    height: "100%",
                    textDecoration: "none",
                  }}
                  to={obj.link}
                >
                  {obj.text}
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Outlet />
    </>
  );
};

export default SideBar;
