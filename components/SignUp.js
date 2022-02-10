import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";

import { CreateAccount } from "../api/mutations/createAccount";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const createAccount = useMutation(CreateAccount);

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const confirmHandler = (e) => {
    setConfirm(e.target.value);
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const submitHandler = () => {
    // need username, password, confirm password, first name and last name
    if (password !== confirm) {
      // error
    }
    // if all passes then send data to database / create session\
    if (!username || !password) return;
    createAccount.mutate({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box>
        <TextField
          required
          id="first-name"
          label="First name"
          onChange={firstNameHandler}
          value={firstName}
        />
        <TextField
          required
          id="last-name"
          label="Last name"
          onChange={lastNameHandler}
          value={lastName}
        />
      </Box>

      <TextField
        required
        id="username"
        label="Username"
        onChange={usernameHandler}
        value={username}
      />
      <Box>
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          onChange={passwordHandler}
          value={password}
        />
        <TextField
          required
          id="confirm"
          label="Confirm"
          type="password"
          onChange={confirmHandler}
          value={confirm}
        />
      </Box>
      <Button onClick={submitHandler}>Submit</Button>
    </Box>
  );
};

export default SignUp;
