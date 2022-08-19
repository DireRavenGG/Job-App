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
import UserProps from "../types/user";

// if logged in change AccountUserIcon to something else

const signoutRequest = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok;
};

const Navigation = ({ user }: { user?: UserProps | null }) => {
  const [drawer, setDrawer] = useState(false);

  const router = useRouter();

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const signOutHandler = async () => {
    const res = await signoutRequest();
    if (res) {
      router.reload();
    }
  };

  const renderLoginButtons = () => {
    if (router.pathname == "/signup" || router.pathname == "/login") {
    } else {
      if (user) {
        return <Button onClick={signOutHandler}>Sign Out</Button>;
      }
      return (
        <Stack direction="row">
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button onClick={() => router.push("/signup")}>Sign Up</Button>
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
