import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { format, startOfToday } from "date-fns";
import { useState } from "react";
import { useMutation } from "react-query";

async function createJobRequest(jobData) {
  const response = await fetch("/api/jobs/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job: jobData }),
  });
  const data = await response.json();
  const { job } = data;
  return job;
}

const AddForm = ({ setJobObject }) => {
  const [select, setSelect] = useState("");
  const [job, setJob] = useState("");
  const result = startOfToday;
  const [date, setDate] = useState(result);

  const { mutate } = useMutation(createJobRequest);

  const jobHandler = (e) => {
    setJob(e.target.value);
  };

  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  const submitHandler = () => {
    mutate({
      title: job,
      datePosted: format(date, "MM/dd/yy"),
      status: select,
    });

    setSelect("");
    setDate();
    setJob("");
  };

  return (
    <Container>
      <Paper elevation={4}>
        <Stack direction="column" alignItems="center" sx={{ py: 5 }}>
          <Typography variant="h4">New Card Form</Typography>
        </Stack>
        <Box>
          <Stack direction="row" justifyContent="space-evenly">
            <Input
              placeholder="Job Title"
              id="job-title"
              value={job}
              required
              onChange={jobHandler}
            />
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={(date) => {
                setDate(date);
              }}
              renderInput={(params) => <TextField {...params} />}
              allowSameDateSelection
            ></DesktopDatePicker>
          </Stack>
        </Box>

        <Stack direction="column" alignItems="center" sx={{ py: 10 }}>
          <FormControl sx={{ minWidth: "120px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Status*
            </InputLabel>
            <Select
              value={select}
              onChange={selectHandler}
              labelId="demo-simple-select-standard-label"
              label="Status *"
              required
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>

              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField id="more-info" multiline maxRows={4} />
        </Stack>
        <Button variant="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default AddForm;
