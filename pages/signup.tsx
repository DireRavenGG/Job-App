import {
  Box,
  Container,
  FormControl,
  Input,
  TextField,
  Stack,
  Button,
  Link,
  Paper,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
const SignUp = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
    username: "",
  });
  // const { data: session } = useSession();
  // const [user, setUser] = useState({});

  const formHandler = () => {};
  const textFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: e.target.value,
    }));
  };
  return (
    <Box>
      <Navigation />
      <Paper elevation={4} sx={{ background: "#292f39" }}>
        <Container sx={{ padding: 4 }}>
          <FormControl onSubmit={formHandler}>
            <Stack spacing={4}>
              <TextField
                label="Username"
                value={formData.username}
                onChange={(e) => {
                  textFieldChange(e, "username");
                }}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => {
                    textFieldChange(e, "password");
                  }}
                />
                <TextField
                  label="Confirm"
                  type="password"
                  value={formData.confirm}
                  onChange={(e) => {
                    textFieldChange(e, "confirm");
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button>Sign in instead</Button>
                <Button variant="contained" size="small" type="submit">
                  Enter
                </Button>
              </Stack>
            </Stack>
          </FormControl>
        </Container>
      </Paper>
    </Box>
  );
};

export default SignUp;
