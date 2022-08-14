import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import Navigation from "../components/Navigation";

type LoginProps = {
  username: string;
  password: string;
};
const loginRequest = async (userData: LoginProps) => {
  const response = await fetch("/api/auth/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userData }),
  });
  const data = await response.json();
  const { job } = data;
  return job;
};

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const formHandler = (e: any) => {
    e.preventDefault();
    loginRequest(formData);
  };

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
      <Container fixed={true} maxWidth="xs">
        <Container sx={{ padding: 4 }}>
          <Box paddingBottom={2}>
            <Typography fontSize={26} fontWeight={200} color={"#c7cdd1"}>
              Sign In
            </Typography>
          </Box>
          <FormControl component="form" onSubmit={formHandler}>
            <Stack spacing={4}>
              <TextField
                label="Username"
                required={true}
                value={formData.username}
                onChange={(e) => {
                  textFieldChange(e, "username");
                }}
              />
              <Stack>
                <TextField
                  label="Password"
                  type={showPassword ? "" : "password"}
                  required={true}
                  value={formData.password}
                  onChange={(e) => {
                    textFieldChange(e, "password");
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => setShowPassword((prev) => !prev)}
                    />
                  }
                  label="Show password"
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button>Create Account</Button>
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  value="submit"
                >
                  Enter
                </Button>
              </Stack>
            </Stack>
          </FormControl>
        </Container>
      </Container>
    </Box>
  );
};

export default Login;
