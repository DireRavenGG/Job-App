import { Button, Card as MuiCard, Typography } from "@mui/material";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { deleteJobRequest } from "../api/mutations/deleteJobRequest";

const Card = ({
  title,
  datePosted,
  id,
  status,
  // setSendId,
  // setNewStatus,
  // setDeleteToggle,
}) => {
  const deleteMutate = useMutation(deleteJobRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("jobs");
    },
  });

  const deleteHandler = () => {
    deleteMutate.mutate({
      id,
    });
  };

  return (
    <MuiCard sx={{ width: "200px", bgcolor: "#fff", color: "secondary.main" }}>
      <Typography variant="h6">{title}</Typography>
      <Typography varinat="body-2">Posted: {datePosted}</Typography>
      <Button onClick={deleteHandler}>Delete</Button>
    </MuiCard>
  );
};

export default Card;
