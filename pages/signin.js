import { Box, Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function SignIn() {
  const [accountStatus, setAccountStatus] = useState("login");

  const accountStatusHandler = (e) => {
    setAccountStatus(e.target.value);
  };
  return (
    <Container>
      <ToggleButtonGroup exclusive onClick={accountStatusHandler}>
        <ToggleButton value="login">Log In</ToggleButton>
        <ToggleButton value="signUp">Sign Up</ToggleButton>
      </ToggleButtonGroup>

      <Box>{accountStatus == "login" ? <Login /> : <SignUp />}</Box>
    </Container>
  );
}
