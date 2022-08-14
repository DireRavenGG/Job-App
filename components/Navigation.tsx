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
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { useRouter } from "next/router";

// if logged in change AccountUserIcon to something else

const Navigation = () => {
  const [drawer, setDrawer] = useState(false);
  // const popupState = usePopupState({
  //   variant: "popover",
  //   popupId: "navigation",
  // });

  const router = useRouter();

  //add login in to drawer aswell
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const buttonHandler = (action: string) => {
    if (action == "login") {
    } else {
    }
  };
  const renderList = () => {
    return (
      <List>
        <ListItem button>Login</ListItem>
      </List>
    );
  };

  const renderLoginButtons = () => {
    if (router.pathname == "/signup" || router.pathname == "/login") {
      return;
    } else {
      return (
        <Stack direction="row">
          <Button>Login</Button>
          <Button>Sign Up</Button>
        </Stack>
      );
    }
  };
  return (
    <Box sx={{ p: 1, mb: 10, bgcolor: "secondary.dark" }}>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={toggleDrawer}>
          <MenuIcon sx={{ fontSize: 40 }} />
        </Button>
        {}
        {/* <Button {...bindTrigger(popupState)}>
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </Button> */}
        {/* <Popover
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
        </Popover> */}
        {renderLoginButtons()}
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
