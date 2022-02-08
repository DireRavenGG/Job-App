import {
  Button,
  Card as MuiCard,
  Dialog,
  Popper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { deleteJobRequest } from "../api/mutations/deleteJobRequest";
import CardInfo from "./CardInfo";

const Card = ({ title, datePosted, id, allJobs, setLocalJobs }) => {
  const [open, setOpen] = useState(false);

  const deleteMutate = useMutation(deleteJobRequest, {});

  const deleteHandler = () => {
    if (!allJobs) return;
    const allButDeleted = [];
    allJobs.forEach((job) => {
      if (job.id == id) {
        return null;
      }
      allButDeleted.push(job);
    });
    setLocalJobs(allButDeleted);
    deleteMutate.mutate({
      id,
    });
  };

  const openHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <MuiCard
      sx={{
        width: "200px",
        bgcolor: "#fff",
        m: 1,
        p: 1,
        color: "secondary.main",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography varinat="body-2">Posted: {datePosted}</Typography>
      <Button onClick={deleteHandler}>Delete</Button>
      <Button onClick={openHandler}>More Info</Button>
      {open ? (
        <Dialog open={open} onClose={closeHandler} maxWidth={false}>
          <CardInfo title={title} datePosted={datePosted} />
        </Dialog>
      ) : null}
    </MuiCard>
  );
};

export default Card;
