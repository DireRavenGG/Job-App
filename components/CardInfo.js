import { Box, Button, Stack, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import EditIcon from "@mui/icons-material/Edit";

// Fix TextAreaAutoSize to not display box
// and send data on close to server

const CardInfo = ({ title, datePosted, moreInfo }) => {
  return (
    <Box bgcolor="#fefefe" justifyContent="center" height="80vh" width="60vw">
      <Stack direction="row" alignItems="center" m="8px">
        <Typography variant="h4" sx={{ p: 1 }}>
          {title}
        </Typography>
        <Typography variant="subtitle" sx={{ p: 1 }}>
          ({datePosted})
        </Typography>
        <Button>
          <EditIcon />
        </Button>
      </Stack>

      <Box sx={{ p: 1 }}>
        <Typography variant="h6">More Info</Typography>
        <TextareaAutosize
          defaultValue={moreInfo}
          style={{
            outline: 0,
            resize: "none",
          }}
        />
      </Box>
    </Box>
  );
};

export default CardInfo;
