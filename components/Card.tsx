import {
  Button,
  Card as MuiCard,
  Dialog,
  Popper,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { deleteJobRequest } from "../api/mutations/deleteJobRequest";
import CardInfo from "./CardInfo";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material/node_modules/@mui/system";
interface Props {
  title: string;
  datePosted: string;
  id: number;
  allJobs: any[];
  setLocalJobs: Dispatch<SetStateAction<any[]>>;
  moreInfo: string;
  user: {
    user: {
      name: string;
    };
  };
  setCheese: Dispatch<SetStateAction<any[]>>;
}
const Card: React.FC<Props> = ({
  title,
  datePosted,
  id,
  allJobs,
  setLocalJobs,
  moreInfo,
  user,
  setCheese,
}) => {
  const [open, setOpen] = useState(false);

  const deleteMutate = useMutation(deleteJobRequest, {});

  const deleteHandler = () => {
    if (!allJobs) return;
    if (!user) {
      return;
    } else {
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
    }
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
        color: "secondary.main",
      }}
    >
      <Box sx={{ p: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">Posted: {datePosted}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Box sx={{ mr: 10 }}>
          <Button onClick={deleteHandler}>
            <DeleteIcon />
          </Button>
        </Box>
        <Box>
          <Button onClick={openHandler}>
            <ExpandMoreIcon />
          </Button>
        </Box>
      </Box>

      {open ? (
        <Dialog open={open} onClose={closeHandler} maxWidth={false}>
          <CardInfo
            title={title}
            datePosted={datePosted}
            moreInfo={moreInfo}
            setLocalJobs={setLocalJobs}
            id={id}
            user={user}
            allJobs={allJobs}
            setCheese={setCheese}
          />
        </Dialog>
      ) : null}
    </MuiCard>
  );
};

export default Card;
