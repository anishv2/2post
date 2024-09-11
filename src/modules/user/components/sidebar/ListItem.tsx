import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../../routes/routeslinks";
import Person2Icon from '@mui/icons-material/Person2';



const { FEEDS, CREATE_POST, PROFILE } = ROUTES;

// const activeStyle = {
//   backgroundColor: "primary",
// };

export const mainListItems = (
  <React.Fragment>
    <ListItemButton
      // style={({ isActive }) => (isActive ? activeStyle : undefined)}
      component={NavLink}
      to={`/user/${FEEDS}`}
    >
      <ListItemIcon sx={{ color: "inherit" }}>
        <FeedIcon />
      </ListItemIcon>
      <ListItemText primary="Feeds" />
    </ListItemButton>
    <ListItemButton
      // style={({ isActive }) => (isActive ? activeStyle : undefined)}
      component={NavLink}
      to={CREATE_POST}
    >
      <ListItemIcon sx={{ color: "inherit" }}>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Create Post" />
    </ListItemButton>
    <ListItemButton
      // style={({ isActive }) => (isActive ? activeStyle : undefined)}
      component={NavLink}
      to={PROFILE}
    >
      <ListItemIcon sx={{ color: "inherit" }}>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);

export const rightListItems=(
  <React.Fragment>
  <ListItemButton>
    <ListItemIcon>
      <Person2Icon />
    </ListItemIcon>
    <ListItemText primary="Olivia Miller" />
  </ListItemButton>
  <ListItemButton>
    <ListItemIcon>
      <Person2Icon />
    </ListItemIcon>
    <ListItemText primary="Mike Jordan" />
  </ListItemButton>
  <ListItemButton>
    <ListItemIcon>
      <Person2Icon />
    </ListItemIcon>
    <ListItemText primary="Nick James" />
  </ListItemButton>
  <ListItemButton>
    <ListItemIcon>
      <Person2Icon />
    </ListItemIcon>
    <ListItemText primary="Tim Watt" />
  </ListItemButton>
</React.Fragment>
)

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
