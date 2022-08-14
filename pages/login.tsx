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

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
    username: "",
  });
  const [checkPasswordMatch, setCheckPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formHandler = (e: any) => {
    e.preventDefault();
    if (formData.confirm != formData.password) {
      setCheckPasswordMatch(true);
    } else {
      setCheckPasswordMatch(false);
      console.log(formData);
    }
  };

  const textFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    if (type == "password") {
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
                  error={checkPasswordMatch}
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
