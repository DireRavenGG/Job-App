import { Box, Button, Stack, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { updateJobs } from "../api/mutations/updateJob";

// Fix TextAreaAutoSize to not display box
// and send data on close to server

const CardInfo = ({
  title,
  datePosted,
  moreInfo,
  id,
  setLocalJobs,
  user,
  allJobs,
  setCheese,
}) => {
  const [edit, setEdit] = useState(false);
  const [moreInfoVal, setMoreInfoVal] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [inputWidth, setInputWidth] = useState();
  const { mutate } = useMutation(updateJobs);
  useEffect(() => {
    setMoreInfoVal(moreInfo);
    setNewTitle(title);
  }, [moreInfo, title]);

  useEffect(() => {
    setInputWidth((newTitle.length + 1) * 20);
  }, [newTitle]);

  const moreInfoHandler = (e) => {
    setMoreInfoVal(e.target.value);
  };

  const editHandler = () => {
    setEdit((prevEdit) => !prevEdit);
    saveEdit();
  };
  const newTitleHandler = (e) => {
    setNewTitle(e.target.value);
  };

  const saveEdit = () => {
    if (!edit) return;
    if (user.user) {
      mutate({
        id: id,
        title: newTitle,
        moreInfo: moreInfoVal,
      });
      let updateJob = allJobs.map((obj) =>
        obj.id === id ? { ...obj, title: newTitle, moreInfo: moreInfoVal } : obj
      );
      setLocalJobs(updateJob);
    }
    let updateJob = allJobs.map((obj) =>
      obj.id === id ? { ...obj, title: newTitle, moreInfo: moreInfoVal } : obj
    );
    setCheese(updateJob);
  };

  return (
    <Box bgcolor="#fefefe" justifyContent="center" height="80vh" width="60vw">
      <Stack
        direction="row"
        alignItems="center"
        m="8px"
        justifyContent="center"
      >
        {edit ? (
          <TextareaAutosize
            defaultValue={newTitle}
            value={newTitle}
            onChange={newTitleHandler}
            style={{
              resize: "none",
              border: 0,
              fontSize: "34px",
              width: `${inputWidth}px`,
              fontFamily: "Roboto",
            }}
          />
        ) : (
          <Typography variant="h4" sx={{ p: 1 }}>
            {title}
          </Typography>
        )}

        <Typography variant="subtitle" sx={{ p: 1 }}>
          ({datePosted})
        </Typography>
        <Button onClick={editHandler}>
          {edit ? <EditOffIcon sx={{ color: "error.main" }} /> : <EditIcon />}
        </Button>
      </Stack>

      <Box
        sx={{ p: 1 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h6">More Info</Typography>
        {edit ? (
          <TextareaAutosize
            defaultValue={moreInfoVal}
            value={moreInfoVal}
            onChange={moreInfoHandler}
            minRows={10}
            style={{
              resize: "none",
              fontSize: "1rem",
              width: "35vw",
              fontFamily: "Roboto",
            }}
          />
        ) : (
          <Typography variant="body1" sx={{ width: "35vw" }}>
            {moreInfoVal}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CardInfo;
