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
import { useRouter } from "next/router";
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
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const formHandler = async (e: any) => {
    e.preventDefault();
    const response = await loginRequest(formData);
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
          <Box paddingBottom={4}>
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
                error={notFound}
                onChange={(e) => {
                  textFieldChange(e, "username");
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "" : "password"}
                required={true}
                error={notFound}
                value={formData.password}
                onChange={(e) => {
                  textFieldChange(e, "password");
                }}
              />
              <Stack>
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
                <Button onClick={() => router.push("/signup")}>
                  Create Account
                </Button>
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
