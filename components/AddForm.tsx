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

const AddForm = ({ user, setCheese, cheese }) => {
  const [select, setSelect] = useState("");
  const [job, setJob] = useState("");
  const result = startOfToday;
  const [date, setDate] = useState(result);
  const [moreInfo, setMoreInfo] = useState("");
  const { mutate } = useMutation(createJobRequest);

  // REFACTOR HANDLERS CLEAN THIS SHIT UP
  // const handler = (e, set) => {

  // }

  const jobHandler = (e) => {
    setJob(e.target.value);
  };

  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  const infoHandler = (e) => {
    setMoreInfo(e.target.value);
  };

  const submitHandler = () => {
    if (user.user) {
      mutate({
        title: job,
        datePosted: format(date, "MM/dd/yy"),
        status: select,
        moreInfo: moreInfo,
        name: user.user.name,
      });
      setSelect("");
      setDate(null);
      setJob("");
      setMoreInfo("");
      window.location.href = "/";
      return;
    }

    setCheese((prevCheese) => [
      ...prevCheese,
      {
        id: cheese.length + 1,
        title: job,
        datePosted: format(date, "MM/dd/yy"),
        status: select,
        moreInfo: moreInfo,
        user: "demo",
      },
    ]);
    setSelect("");
    setDate(null);
    setJob("");
    setMoreInfo("");
  };

  return (
    <Container>
      <Paper elevation={4} sx={{ px: 4, bgcolor: "" }}>
        <Stack direction="column" alignItems="center" sx={{ py: 5 }}>
          <Typography variant="h4">New Card Form</Typography>
        </Stack>
        <Box>
          <Stack direction="row" justifyContent="space-between">
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

        <Stack direction="column" alignItems="center" sx={{ pt: 10, pb: 5 }}>
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
              <MenuItem value="Look Over">Look Over</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Box display="flex" justifyContent="center">
          <TextField
            id="more-info"
            placeholder=" Optional* Add More Info"
            onChange={infoHandler}
            value={moreInfo}
            multiline
            minRows={4}
            maxRows={16}
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" py={4}>
          <Button
            variant="text"
            onClick={submitHandler}
            sx={{
              fontSize: "20px",
              bgcolor: "secondary.light",
              color: "#fefefe",
              "&:hover": { bgcolor: "rgb(76, 79, 80)" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddForm;
