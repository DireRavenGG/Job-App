import {
  Avatar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import session from "express-session";
import Image from "next/image";

// if logged in change AccountUserIcon to something else

const Navigation = ({ user, signIn, signOut }) => {
  const [drawer, setDrawer] = useState(false);

  //add login in to drawer aswell
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  console.log(user);

  const renderButton = () => {
    if (!user || !user.user) {
      return <AccountCircleIcon sx={{ fontSize: 40 }} />;
    }
    return <Avatar src={user.user.image} />;
  };

  const renderList = () => {
    if (!user || !user.user) {
      return (
        <List>
          <ListItem button onClick={() => signIn()}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      );
    }
    return (
      <List>
        <ListItem button onClick={() => signOut()}>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    );
  };
  return (
    <Box sx={{ p: 1, mb: 10, bgcolor: "secondary.dark" }}>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={toggleDrawer}>
          <MenuIcon sx={{ fontSize: 40 }} />
        </Button>
        <PopupState variant="popover">
          {(popupState) => (
            <div>
              <Button {...bindTrigger(popupState)}>{renderButton()}</Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {renderList()}
              </Popover>
            </div>
          )}
        </PopupState>
      </Stack>
      <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
        <Box
          sx={{
            height: "100%",
            bgcolor: "secondary.light",
            color: "#fefefe",
            minWidth: "23vw",
          }}
        >
          <List>
            <Link passHref href="/">
              <ListItem button>
                <HomeIcon sx={{ mr: 2 }} />
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Divider />
            <Link passHref href="/add">
              <ListItem button>
                <AddIcon sx={{ mr: 2 }} />
                <ListItemText primary="Add Task" />
              </ListItem>
            </Link>
            <Divider />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navigation;
