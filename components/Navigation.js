import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
const Navigation = () => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <div>
      <Button onClick={toggleDrawer}>Button</Button>
      <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
        <Box sx={{ height: "100%" }}>
          <List>
            <Link passHref href="/">
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Divider />
            <Link passHref href="/add">
              <ListItem button>
                <ListItemText primary="Add Task" />
              </ListItem>
            </Link>
            <Divider />
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navigation;
