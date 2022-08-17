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
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Navigation from "../components/Navigation";

type CreateAccountProps = {
  username: string;
  password: string;
};

const createAccountRequest = async (userData: CreateAccountProps) => {
  const response = await fetch("/api/auth/createAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userData }),
  });
  const data = await response.json();
  const { status } = data;
  return status;
};
const SignUp = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
    username: "",
  });
  const [checkPasswordMatch, setCheckPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [throwErr, setThrowErr] = useState(false);
  const router = useRouter();

  const formHandler = async (e: any) => {
    e.preventDefault();
    if (formData.confirm != formData.password) {
      setCheckPasswordMatch(true);
    } else {
      setCheckPasswordMatch(false);
      const ifCreated = await createAccountRequest({
        username: formData.username,
        password: formData.password,
      });
      if (ifCreated) {
        router.push("/");
      } else {
        setThrowErr(true);
      }
    }
  };

  const textFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    if (type == "password" || "confirm") {
      setCheckPasswordMatch(false);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: e.target.value,
    }));
  };
  return (
    <Box>
      <Navigation />
      <Container fixed={true} maxWidth="sm">
        <Container sx={{ padding: 4 }}>
          <Box paddingBottom={2}>
            <Typography fontSize={26} fontWeight={200} color={"#c7cdd1"}>
              Create a Account
            </Typography>
          </Box>
          <FormControl component="form" onSubmit={formHandler}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                required={true}
                value={formData.username}
                onChange={(e) => {
                  textFieldChange(e, "username");
                }}
                error={throwErr}
                helperText={throwErr ? "Username taken." : ""}
              />
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Password"
                    type={showPassword ? "" : "password"}
                    error={checkPasswordMatch}
                    required={true}
                    value={formData.password}
                    onChange={(e) => {
                      textFieldChange(e, "password");
                    }}
                  />
                  <TextField
                    label="Confirm"
                    type={showPassword ? "" : "password"}
                    error={checkPasswordMatch}
                    required={true}
                    value={formData.confirm}
                    onChange={(e) => {
                      textFieldChange(e, "confirm");
                    }}
                  />
                </Stack>
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
                <Button onClick={() => router.push("/login")}>
                  Sign in instead
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

export default SignUp;
