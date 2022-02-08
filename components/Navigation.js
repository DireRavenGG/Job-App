import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
const Navigation = () => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <Box sx={{ p: 1, mb: 10, bgcolor: "secondary.dark" }}>
      <Button onClick={toggleDrawer}>
        <MenuIcon sx={{ fontSize: 40 }} />
      </Button>
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
