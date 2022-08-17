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
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { Job } from "../types/job";
import UserProps from "../types/user";

async function createJobRequest(jobData: any) {
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
interface AddFormProps {
  user: UserProps;
  setDemo: Dispatch<SetStateAction<Job[]>>;
  demo: Job[];
}
const AddForm = ({ user, setDemo, demo }: AddFormProps) => {
  const [select, setSelect] = useState("");
  const [job, setJob] = useState("");
  const result = startOfToday;
  const [date, setDate] = useState(result);
  const [moreInfo, setMoreInfo] = useState("");
  const { mutate } = useMutation(createJobRequest);

  // REFACTOR HANDLERS CLEAN THIS SHIT UP
  // const handler = (e, set) => {

  // }

  const handler = (e: any, set: SetStateAction<any>) => {
    set(e.target.value);
  };

  const submitHandler = () => {
    if (user) {
      mutate({
        title: job,
        datePosted: format(date, "MM/dd/yy"),
        status: select,
        moreInfo: moreInfo,
        name: user.username,
      });
      setSelect("");
      setDate(result);
      setJob("");
      setMoreInfo("");
      window.location.href = "/";
      return;
    }

    setDemo((prevDemo: Job[]) => [
      ...prevDemo,
      {
        id: demo.length + 1,
        title: job,
        datePosted: format(date, "MM/dd/yy"),
        status: select,
        moreInfo: moreInfo,
        user: "demo",
      },
    ]);
    setSelect("");
    setDate(result);
    setJob("");
    setMoreInfo("");
  };

  return (
    <Container>
      <Stack direction="column" alignItems="center" sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="200" color="#c7cdd1">
          New Card Form
        </Typography>
      </Stack>
      <Box>
        <Stack direction="row" justifyContent="space-between">
          <TextField
            placeholder="Job Title"
            id="job-title"
            value={job}
            required
            onChange={(e) => handler(e, setJob)}
          ></TextField>
          <DesktopDatePicker
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={(date) => {
              setDate(date || result);
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
            onChange={(e) => handler(e, setSelect)}
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
          placeholder=" Optional - Add More Info"
          onChange={(e) => handler(e, setMoreInfo)}
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
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddForm;
