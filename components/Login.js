import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { AccountLogin } from "../api/mutations/accountLogin";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const accountLogin = useMutation(AccountLogin);

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitHandler = () => {
    // see if username and password match something in database
    accountLogin.mutate({
      username: username,
      password: password,
    });
  };
  return (
    <Paper sx={{ bgcolor: "#fefefe" }}>
      <Box>
        <TextField
          required
          id="username"
          label="Username"
          onChange={usernameHandler}
          value={username}
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          onChange={passwordHandler}
          value={password}
        />
        <Button onClick={submitHandler}>Submit</Button>
      </Box>
    </Paper>
  );
};

export default Login;
